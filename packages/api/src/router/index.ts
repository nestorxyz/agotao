import { router } from "../trpc";

import { authRouter } from "../modules/auth/router";
import { companyRouter } from "../modules/company/router";
import { productRouter } from "../modules/product/router";

export const appRouter = router({
  auth: authRouter,
  company: companyRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
