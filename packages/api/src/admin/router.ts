import { router } from "../trpc";

import { validatePurchase, getPurchases } from "./useCases";

export const adminRouter = router({
  validatePurchase,
  getPurchases,
});
