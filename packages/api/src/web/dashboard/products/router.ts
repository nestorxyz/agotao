import { router } from "../../../trpc";

import getPageData from "./getPageData";

export const productsRouter = router({
  getPageData,
});
