import { router } from "../trpc";

import { validatePurchase, getPurchases, invalidatePurchase } from "./useCases";

export const adminRouter = router({
  validatePurchase,
  getPurchases,
  invalidatePurchase,
});
