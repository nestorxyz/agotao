// Libraries
import boom from "@hapi/boom";

// Types
import { RequestHandler } from "express";
import { Schema } from "joi";

enum Property {
  body = "body",
  params = "params",
  query = "query",
}

export const validatorHandler = (
  schema: Schema,
  property: keyof typeof Property,
): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      next(boom.badRequest(message));
    }
  };
};
