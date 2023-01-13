import { router } from "../trpc";

import { getPage } from "./useCases";

export const checkoutRouter = router({
  getPage,
});
