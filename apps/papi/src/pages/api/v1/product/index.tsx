import Joi from "joi";
import boom from "@hapi/boom";
import { prisma } from "@acme/db";
import type { NextApiRequest, NextApiResponse } from "next";

import withJoi from "@/lib/withJoi";

const bodySchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string().required().uri(),
  metadata: Joi.object().optional(),
});

interface ValidatedRequest extends NextApiRequest {
  body: {
    name: string;
    price: number;
    image: string;
    metadata: any; // eslint-disable-line
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
        body: { name, price, image, metadata },
      } = req;

      const product = await prisma.product.create({
        data: {
          company_id: company.id,
          name,
          price,
          image,
          created_by: company.admin_id,
          metadata,
        },
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          metadata: true,
        },
      });

      return res.status(201).json({
        product,
        metadata,
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
