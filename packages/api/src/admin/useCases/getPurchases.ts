import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";

export const getPurchases = protectedProcedure.query(async ({ ctx }) => {
  const purchases = await ctx.prisma.purchase.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      updatedAt: true,
      amount: true,
      commission: true,
      status: true,
      checkoutSession: {
        select: {
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
        },
      },
    },
  });

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
});
