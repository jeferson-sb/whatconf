import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

export const userRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany()
  }),
  create: publicProcedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      })
    }),
  setFCMToken: publicProcedure
    .input(z.object({ id: z.string(), token: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: { fcmToken: input.token },
      })
    }),
})
