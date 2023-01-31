import Joi from "joi";
import dayjs from "dayjs";
import boom from "@hapi/boom";
import { prisma, Prisma } from "@acme/db";
import type { NextApiRequest, NextApiResponse } from "next";

import withJoi from "@/lib/withJoi";

const bodySchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      product_id: Joi.string().required(),
      quantity: Joi.number().required(),
    }),
  ),
  success_url: Joi.string().required(),
  cancel_url: Joi.string().optional(),
  customer_name: Joi.string().optional(),
  customer_email: Joi.string().optional(),
  metadata: Joi.object().optional(),
});

interface ValidatedRequest extends NextApiRequest {
  body: {
    items: {
      product_id: string;
      quantity: number;
    }[];
    success_url: string;
    cancel_url: string;
    customer_name: string;
    customer_email: string;
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

    if (req.method == "POST") {
      const company = await prisma.company.findUnique({
        where: {
          sk_live: bearerToken,
        },
      });

      if (!company) {
        throw boom.unauthorized("Invalid Token");
      }

      // Logic
      const {
        items,
        success_url,
        cancel_url,
        customer_name,
        customer_email,
        metadata,
      } = req.body;

      const session = await prisma.checkoutSession.create({
        data: {
          company_id: company.id,
          success_url,
          cancel_url,
          customer_name,
          customer_email,
          expires_at: dayjs().add(15, "minute").toISOString(),
          order_items: {
            create: items.map((item) => ({
              product_id: item.product_id,
              quantity: item.quantity,
            })),
          },
          metadata: metadata as Prisma.InputJsonValue,
        },
        select: {
          id: true,
          success_url: true,
          cancel_url: true,
          customer_name: true,
          customer_email: true,
          expires_at: true,
          payment_intent: {
            select: {
              id: true,
              status: true,
            },
          },
          status: true,
          metadata: true,
        },
      });

      res.status(201).json({
        url: `https://checkout.agotao.com/c/${session.id}`,
        success_url: session.success_url,
        cancel_url: session.cancel_url,
        customer_details: {
          name: session.customer_name,
          email: session.customer_email,
        },
        expires_at: session.expires_at,
        payment_status: session.payment_intent
          ? session.payment_intent.status
          : null,
        status: session.status,
        metadata: session.metadata,
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
