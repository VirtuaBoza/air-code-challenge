import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { rootRouter } from "@/server/routers/_root";

const handler = async (req: Request) => {
  return fetchRequestHandler({
    createContext: () => ({}),
    endpoint: "/api/trpc",
    req,
    router: rootRouter,
  });
};

export { handler as GET, handler as POST };
