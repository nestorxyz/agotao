import { router } from "../../../trpc";

import getPageData from "./getPageData";

export const developersRouter = router({
  getPageData,
});
