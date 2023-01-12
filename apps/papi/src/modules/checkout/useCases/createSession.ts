import Joi from "joi";
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator,
  ValidatedRequest,
} from "express-joi-validation";
import { Response, NextFunction } from "express";

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
    items: {
      product_id: string;
      quantity: number;
    };
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
  } catch (error) {
    next(error);
  }
};
