import { confRouter } from '@/server/api/routers/conference'
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc'

import { userRouter } from './routers/user'
import { categoryRouter } from './routers/category'
import { reminderRouter } from './routers/reminder'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  conference: confRouter,
  user: userRouter,
  category: categoryRouter,
  reminder: reminderRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
