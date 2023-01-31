import { router } from "../../trpc";

import { getCompanies } from "./useCases";

export const dashboardRouter = router({
  getCompanies,
});
