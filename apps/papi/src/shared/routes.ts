import express from "express";
import { Express } from "express";

import checkoutRouter from "@/modules/checkout/router";

const routerApi = (app: Express) => {
  const router = express.Router();
  app.use("/v1", router);

  router.use("/checkout", checkoutRouter);
};

export default routerApi;
