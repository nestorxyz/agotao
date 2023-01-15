import Joi from "joi";
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator,
  ValidatedRequest,
} from "express-joi-validation";
import { Response, NextFunction } from "express";
import prisma from "@/shared/lib/prisma";
import dayjs from "dayjs";

import { RequestWithCompany } from "@/shared/middlewares/authorization.handler";

const validator = createValidator({
  passError: true,
});

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
});

interface BodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    items: Array<{
      product_id: string;
      quantity: number;
    }>;
    success_url: string;
    cancel_url?: string;
    customer_name?: string;
    customer_email?: string;
  };
}

export const createSessionValidator = validator.body(bodySchema);

export const createSession = async (
  req: ValidatedRequest<BodySchema>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const company = (req as RequestWithCompany).company;

    const { items, success_url, cancel_url, customer_name, customer_email } =
      req.body;

    const session = await prisma.checkoutSession.create({
      data: {
        company_id: company.id,
        success_url,
        cancel_url,
        customer_name,
        customer_email,
        expires_at: dayjs().add(15, "minute").toISOString(),
        orderItems: {
          create: items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
          })),
        },
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
      payment_status: session.payment_status,
      status: session.status,
    });
  } catch (error) {
    next(error);
  }
};
