// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { SanityRouter } from "./sanity/home";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("sanity.", SanityRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
