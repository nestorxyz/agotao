import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";

import { Company, prisma } from "@acme/db";

export interface RequestWithCompany extends Request {
  company: Company;
}

export const authVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "string") {
    next(boom.unauthorized("Invalid Token"));
    return;
  }

  try {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    const company = await prisma.company.findFirst({
      where: {
        sk_live: bearerToken,
      },
    });

    if (!company) {
      next(boom.unauthorized("Invalid Token"));
      return;
    }

    (req as RequestWithCompany).company = company;
    next();
  } catch (err) {
    next(boom.unauthorized("Invalid Token"));
  }
};
