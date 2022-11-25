import { router, publicProcedure } from "../trpc";

export const categoryRouter = router({
  all:
    publicProcedure.query(({ ctx }) => {
      return ctx.prisma.category.findMany();
    })
})
