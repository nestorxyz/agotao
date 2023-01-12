import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import routerApi from "./routes";
import {
  errorHandler,
  logError,
  boomErrorHandler,
} from "./middlewares/error.handler";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/", (req, res) => {
      return res.json({
        message: "Hi, what are you going to ship today?",
        "Show us on Twitter": "https://twitter.com/nestoredduardo",
      });
    });

  routerApi(app);
  app.use(logError);
  app.use(boomErrorHandler);
  app.use(errorHandler);

  return app;
};
