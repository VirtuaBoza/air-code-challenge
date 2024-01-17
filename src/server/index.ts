import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { rootRouter } from "./routers/_root";

export type TRPCRouter = typeof rootRouter;
export type RouterOutput = inferRouterOutputs<TRPCRouter>;
export type RouterInput = inferRouterInputs<TRPCRouter>;
