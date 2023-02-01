import { router } from "../../trpc";

import { getCompanies, getPayouts } from "./useCases";

export const dashboardRouter = router({
  getCompanies,
  getPayouts,
});
