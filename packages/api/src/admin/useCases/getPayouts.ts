import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";

export const getPayouts = protectedProcedure.query(async ({ ctx }) => {
  const payouts = await ctx.prisma.payout.findMany({
    select: {
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      company: {
        select: {
          name: true,
          admin: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      },
      items: {
        select: {
          id: true,
          name: true,
          email: true,
          amount: true,
          fee: true,
          type: true,
          keyInfo: true,
        },
      },
    },
  });

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
});
