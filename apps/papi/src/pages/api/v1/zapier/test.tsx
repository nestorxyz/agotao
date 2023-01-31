import type { NextApiRequest, NextApiResponse } from "next";
import boom from "@hapi/boom";

import { prisma } from "@acme/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

      res.status(200).json({
        message: "OK",
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

export default handler;
