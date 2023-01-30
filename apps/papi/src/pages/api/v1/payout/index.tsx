import type { NextApiRequest, NextApiResponse } from "next";
import boom from "@hapi/boom";
import Joi from "joi";
import { prisma, Prisma } from "@acme/db";

import withJoi from "@/lib/withJoi";

import { sendMail, Whatever } from "@acme/emails";

const bodySchema = Joi.object({
  destinations: Joi.array().items({
    agotao_account_id: Joi.string().required(),
    amount: Joi.number().required(),
    payout_method: Joi.string()
      .required()
      .valid("BBVA", "BCP", "INTERBANK", "YAPE", "PLIN"),
  }),
  metadata: Joi.object().optional(),
});

interface ValidatedRequest extends NextApiRequest {
  body: {
    destinations: {
      agotao_account_id: string;
      amount: number;
      payout_method: "BBVA" | "BCP" | "INTERBANK" | "YAPE" | "PLIN";
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

      // TODO: Validate destinations
      // TODO: Add fees
      const payoutRequest = await prisma.payout.create({
        data: {
          company_id: company.id,
          items: {
            createMany: {
              data: destinations.map((destination) => ({
                user_id: destination.agotao_account_id,
                amount: destination.amount,
                type: destination.payout_method,
              })),
            },
          },
          metadata: metadata as Prisma.InputJsonValue,
        },
        select: {
          id: true,
          status: true,
          metadata: true,
          items: true,
        },
      });

      const adminMustActionEmail = await sendMail({
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
                    <strong>Amount:</strong> {item.amount}
                  </span>
                  <span>
                    <strong>Payout Method:</strong> {item.type}
                  </span>
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
    }

    throw boom.methodNotAllowed("Method Not Allowed");

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
