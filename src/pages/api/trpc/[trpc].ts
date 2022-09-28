import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/router/app.router";
import { createContext } from "../../../server/context";

// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
