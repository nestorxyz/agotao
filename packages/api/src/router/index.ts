import { router } from "../trpc";

import { companyRouter } from "../modules/company/router";
import { productRouter } from "../modules/product/router";
import { purchaseRouter } from "../modules/purchases/router";
import { userRouter } from "../modules/user/router";

export const appRouter = router({
  company: companyRouter,
  product: productRouter,
  purchase: purchaseRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
