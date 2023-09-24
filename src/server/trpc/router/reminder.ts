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
  getByEvent: publicProcedure
    .input(createValidation)
    .query(({ input: { eventId, userId }, ctx }) => {
      return ctx.prisma.reminder.findFirst({ where: { eventId, userId } })
    }),
  create: publicProcedure.input(createValidation).mutation(({ input, ctx }) => {
    return ctx.prisma.reminder.create({
      data: {
        userId: input.userId,
        eventId: input.eventId,
      },
    })
  }),
  agenda: publicProcedure
    .input(z.string().cuid())
    .query(async ({ input, ctx }) => {
      const reminders = await ctx.prisma.reminder.findMany({
        where: { userId: input },
        include: { event: true },
      })

      return reminders
    }),
})
