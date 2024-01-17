import { router } from "../trpc";
import boards from "./boards";
import assets from "./assets";

export const rootRouter = router({
  boards,
  assets,
});
