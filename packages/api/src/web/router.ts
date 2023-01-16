import { router } from "../trpc";

import { getMySales, updateWebhookURL } from "./useCases";

export const webRouter = router({
  getMySales,
  updateWebhookURL,
});
