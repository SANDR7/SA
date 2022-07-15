// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { AboutRouter } from "./sanity/about";
import { ProjectRouter } from "./sanity/projects";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("projects.", ProjectRouter)
  .merge("about.", AboutRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
