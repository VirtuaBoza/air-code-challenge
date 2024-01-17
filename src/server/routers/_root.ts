import { publicProcedure, router } from "../trpc";
import { fetchBoards } from "@/app/api/boards";
import { fetchAssets } from "@/app/api/clips";
import { z } from "zod";

export const rootRouter = router({
  boards: router({
    getAll: publicProcedure.query(() => {
      return fetchBoards();
    }),
  }),
  assets: router({
    getAll: publicProcedure
      .input(
        z.object({
          cursor: z.string().nullable(),
        })
      )
      .query(({ input }) => {
        return fetchAssets({
          cursor: input.cursor,
        });
      }),
  }),
});
