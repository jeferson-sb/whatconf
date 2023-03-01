import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const confValidationSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  location: z.string(),
  virtual: z.boolean(),
  link: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  categoryId: z.string(),
})

export const confRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany()
  }),
  getById: publicProcedure.input(z.string()).query(({ input: id, ctx }) => {
    return ctx.prisma.event.findUnique({ where: { id } })
  }),
  create: publicProcedure
    .input(confValidationSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.event.create({
        data: {
          title: input.title,
          description: input?.description,
          location: input.location,
          virtual: input.virtual,
          link: input.link,
          startDate: input.startDate,
          endDate: input.endDate,
          categoryId: input.categoryId,
        },
      })
    }),
  update: publicProcedure
    .input(confValidationSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.event.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input?.description,
          location: input?.location,
          virtual: input.virtual,
          link: input.link,
          startDate: input.startDate,
          endDate: input.endDate,
          categoryId: input.categoryId,
        },
      })
    }),
})
