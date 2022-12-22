import { router } from "../trpc";

import { authRouter } from "../modules/auth/router";
import { companyRouter } from "../modules/company/router";

export const appRouter = router({
  auth: authRouter,
  company: companyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
