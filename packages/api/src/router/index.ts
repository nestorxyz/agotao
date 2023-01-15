import { router } from "../trpc";

import { companyRouter } from "../modules/company/router";
import { productRouter } from "../modules/product/router";
import { userRouter } from "../modules/user/router";
import { adminRouter } from "../modules/admin";

import { checkoutRouter } from "../checkout/router";
import { webRouter } from "../web/router";

export const appRouter = router({
  company: companyRouter,
  product: productRouter,
  user: userRouter,
  admin: adminRouter,
  checkout: checkoutRouter,
  web: webRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
