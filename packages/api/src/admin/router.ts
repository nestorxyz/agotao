import { router } from "../trpc";

import {
  validatePurchase,
  getPurchases,
  invalidatePurchase,
  getPayouts,
} from "./useCases";

export const adminRouter = router({
  validatePurchase,
  getPurchases,
  invalidatePurchase,
  getPayouts,
});
