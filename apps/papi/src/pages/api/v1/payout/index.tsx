import type { NextApiRequest, NextApiResponse } from "next";
import boom from "@hapi/boom";
import Joi from "joi";
import { prisma, Prisma } from "@acme/db";

import withJoi from "@/lib/withJoi";

import { sendMail, Whatever } from "@acme/emails";
import { roundNumber2Two, payoutFees } from "@agotao/utils";
import { env } from "@/env/server.mjs";

const bodySchema = Joi.object({
  destinations: Joi.array().items({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    amount: Joi.number().required(),
    payout_method: Joi.string()
      .required()
      .valid("BBVA", "BCP", "INTERBANK", "YAPE", "PLIN"),
    payout_method_info: Joi.string(),
  }),
  metadata: Joi.object().optional(),
});

interface ValidatedRequest extends NextApiRequest {
  body: {
    destinations: {
      name: string;
      email: string;
      amount: number;
      payout_method: "BBVA" | "BCP" | "INTERBANK" | "YAPE" | "PLIN";
      payout_method_info: string;
    }[];
    metadata: Record<string, unknown>;
  };
}

const handler = async (req: ValidatedRequest, res: NextApiResponse) => {
  try {
    // Authorization: Bearer sk_live_123
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== "string") {
      throw boom.unauthorized("Invalid Token");
    }

    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    if (!bearerToken) {
      throw boom.unauthorized("Invalid Token");
    }

    console.log(req.method);

    if (req.method === "POST") {
      const company = await prisma.company.findUnique({
        where: {
          sk_live: bearerToken,
        },
      });

      if (!company) {
        throw boom.unauthorized("Invalid Token");
      }

      const { destinations, metadata } = req.body;

      // Make sure business has enough funds to pay out and fees
      let totalAmount = 0;
      let totalFees = 0;

      destinations.forEach((destination) => {
        const { amount } = destination;

        totalAmount += roundNumber2Two(amount);
        totalFees += payoutFees(amount);
      });

      if (totalAmount + totalFees > company.balance) {
        throw boom.badRequest("Insufficient Funds");
      }

      // Create payout request
      const payoutRequest = await prisma.payout.create({
        data: {
          company_id: company.id,
          items: {
            createMany: {
              data: destinations.map((destination) => ({
                name: destination.name,
                email: destination.email,
                amount: destination.amount,
                fee: payoutFees(destination.amount),
                type: destination.payout_method,
                keyInfo: destination.payout_method_info,
              })),
            },
          },
          metadata: metadata as Prisma.InputJsonValue,
        },
        select: {
          id: true,
          status: true,
          metadata: true,
          items: {
            select: {
              id: true,
              amount: true,
              fee: true,
              name: true,
              email: true,
              type: true,
              keyInfo: true,
            },
          },
        },
      });

      // Discount balance from company
      const companyPayment = prisma.company.update({
        where: {
          id: company.id,
        },
        data: {
          balance: {
            decrement: totalAmount + totalFees,
          },
        },
      });

      // Add fees to master account
      const adminPayment = prisma.user.update({
        where: {
          uid: env.AGOTAO_ADMIN_ID,
        },
        data: {
          balance: {
            increment: totalFees,
          },
        },
      });

      await Promise.all([companyPayment, adminPayment]);

      await sendMail({
        subject: "Payout Good to Go",
        to: "nmamanipantoja@gmail.com",
        // Show company name, amount, and payout method for each destination
        component: (
          <Whatever>
            <p>
              <strong>Company:</strong> {company.name}
            </p>
            <p>
              {payoutRequest.items.map((item) => (
                <>
                  <span>
                    <strong>Name:</strong> {item.name}
                  </span>{" "}
                  <span>
                    <strong>Amount:</strong> {item.amount}
                  </span>{" "}
                  <span>
                    <strong>Payout Method:</strong> {item.type}
                  </span>{" "}
                  <span>
                    <strong>Info:</strong> {item.keyInfo}
                  </span>
                  <br />
                </>
              ))}
            </p>
          </Whatever>
        ),
      });

      return res.status(200).json({
        id: payoutRequest.id,
        status: payoutRequest.status,
        metadata: payoutRequest.metadata,
      });
    } else {
      throw boom.methodNotAllowed("Method Not Allowed");
    }

    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err);

    if (err.isBoom) {
      const {
        output: { statusCode, payload },
      } = err;

      return res.status(statusCode).json(payload);
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default withJoi(
  {
    body: bodySchema,
  },
  handler,
);
