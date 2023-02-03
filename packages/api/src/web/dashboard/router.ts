import { router } from "../../trpc";

import { getCompanies, getPayouts } from "./useCases";
import { developersRouter } from "./developers/router";
import { productsRouter } from "./products/router";

export const dashboardRouter = router({
  getCompanies,
  getPayouts,
  developers: developersRouter,
  products: productsRouter,
});
