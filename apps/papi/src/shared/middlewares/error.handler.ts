import { ErrorRequestHandler } from "express";

export const logError: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  next(err);
};

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
