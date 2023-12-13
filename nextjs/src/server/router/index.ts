// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { AboutRouter } from "./sanity/about";
import { BlogRouter } from "./sanity/blog";
import { ProjectRouter } from "./sanity/projects";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("about.", AboutRouter)
  .merge("blog.", BlogRouter)
  .merge("projects.", ProjectRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
