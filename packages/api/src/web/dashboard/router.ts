import { router } from "../../trpc";

import { getCompanies, getPayouts } from "./useCases";
import { developersRouter } from "./developers/router";

export const dashboardRouter = router({
  getCompanies,
  getPayouts,
  developers: developersRouter,
});
