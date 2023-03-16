import { router } from '../trpc'
import { categoryRouter } from './category'
import { confRouter } from './conference'
import { exampleRouter } from './example'
import { reminderRouter } from './reminder'
import { userRouter } from './user'

export const appRouter = router({
  example: exampleRouter,
  category: categoryRouter,
  conference: confRouter,
  user: userRouter,
  reminder: reminderRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
