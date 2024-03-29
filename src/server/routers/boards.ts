import { fetchBoards } from "@/app/api/boards";
import { publicProcedure, router } from "../trpc";

export default router({
  getAll: publicProcedure.query(() => {
    return fetchBoards();
  }),
});
