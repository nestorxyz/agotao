import { router } from "../trpc";

import { getMySales, updateWebhookURL } from "./useCases";
import { dashboardRouter } from "./dashboard/router";

export const webRouter = router({
  getMySales,
  updateWebhookURL,
  dashboard: dashboardRouter,
});
