import { router } from "../trpc";

import { getMySales } from "./useCases";

export const webRouter = router({
  getMySales,
});
