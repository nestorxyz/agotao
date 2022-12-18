import { router } from "@/trpc";
import { authRouter } from "@/modules/auth/router";

export const appRouter = router({
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
