import { router } from "../trpc";

import { getPage, purchase, getPaymentMethods } from "./useCases";

export const checkoutRouter = router({
  getPage,
  purchase,
  getPaymentMethods,
});
