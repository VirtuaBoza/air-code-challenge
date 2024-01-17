import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { fetchAssets } from "@/app/api/clips";

export default router({
  getAll: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullable().optional(),
      })
    )
    .query(({ input }) => {
      return fetchAssets({
        cursor: input.cursor || null,
      });
    }),
});
