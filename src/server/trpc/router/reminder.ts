import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

const createValidation = z.object({
  userId: z.string().cuid(),
  eventId: z.string().cuid(),
})

export const reminderRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.reminder.findMany()
  }),
  create: publicProcedure.input(createValidation).mutation(({ input, ctx }) => {
    return ctx.prisma.reminder.create({
      data: {
        userId: input.userId,
        eventId: input.eventId,
      },
    })
  }),
})
