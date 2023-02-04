import { router } from "../../../trpc";

import getPageData from "./getPageData";

export const paymentsRouter = router({
  getPageData,
});
