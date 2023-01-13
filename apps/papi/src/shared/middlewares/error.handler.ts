import boom from "@hapi/boom";

// types
import { ErrorRequestHandler } from "express";
import { ExpressJoiError } from "express-joi-validation";

export const logError: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  next(err);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
      stack: err.stack,
    })
    .end();
};

export const boomErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const {
      output: { statusCode, payload },
    } = err;

    res.status(statusCode).json(payload).end();
    return;
  }

  next(err);
};

export const joiErrorHandler: ErrorRequestHandler = (
  err: any | ExpressJoiError, // eslint-disable-line @typescript-eslint/no-explicit-any
  req,
  res,
  next,
) => {
  if (err && err.error && err.error.isJoi) {
    const e: ExpressJoiError = err;

    next(boom.badRequest(`${e.type}: ${e.error?.message}`));
  } else {
    next(err);
  }
};
