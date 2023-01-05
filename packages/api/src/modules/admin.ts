import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc";

export const adminRouter = router({
  payouts: protectedProcedure.query(async ({ ctx }) => {
    const payouts = await ctx.prisma.payout.findMany();

    if (!payouts)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not get payouts",
      });

    return {
      status: 200,
      message: "Payouts found",
      data: payouts,
    };
  }),
  purchases: protectedProcedure.query(async ({ ctx }) => {
    const purchases = await ctx.prisma.purchase.findMany();

    if (!purchases)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not get purchases",
      });

    return {
      status: 200,
      message: "Purchases found",
      data: purchases,
    };
  }),
});
