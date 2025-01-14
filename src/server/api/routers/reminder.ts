import { z } from 'zod'

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

const createValidation = z.object({
  userId: z.string().cuid(),
  eventId: z.string().cuid(),
})

export const reminderRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.reminder.findMany()
  }),
  getByEvent: publicProcedure
    .input(createValidation)
    .query(({ input: { eventId, userId }, ctx }) => {
      return ctx.db.reminder.findFirst({ where: { eventId, userId } })
    }),
  create: publicProcedure.input(createValidation).mutation(({ input, ctx }) => {
    return ctx.db.reminder.create({
      data: {
        userId: input.userId,
        eventId: input.eventId,
      },
    })
  }),
  agenda: publicProcedure
    .input(z.string().cuid())
    .query(async ({ input, ctx }) => {
      const reminders = await ctx.db.reminder.findMany({
        where: { userId: input },
        include: { event: true },
      })

      return reminders
    }),
})