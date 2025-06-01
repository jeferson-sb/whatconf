import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany()
  }),
  create: publicProcedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      })
    }),
  setFCMToken: publicProcedure
    .input(z.object({ id: z.string(), token: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.user.update({
        where: { id: input.id },
        data: { fcmToken: input.token },
      })
    }),
})
