import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  all:
    publicProcedure.query(({ ctx }) => {
      return ctx.db.category.findMany();
    })
})