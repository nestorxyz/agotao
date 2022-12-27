import { router } from "../trpc";

import { authRouter } from "../modules/auth/router";
import { companyRouter } from "../modules/company/router";
import { productRouter } from "../modules/product/router";
import { purchaseRouter } from "../modules/purchases/router";

export const appRouter = router({
  auth: authRouter,
  company: companyRouter,
  product: productRouter,
  purchase: purchaseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
