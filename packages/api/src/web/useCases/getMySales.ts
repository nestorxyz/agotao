import { TRPCError } from "@trpc/server";

// trpc
import { protectedProcedure } from "../../trpc";

export const getMySales = protectedProcedure.query(async ({ ctx }) => {
  const purchases = await ctx.prisma.purchase.findMany({
    where: {
      checkoutSession: {
        company: {
          admin_id: ctx.session.uid,
        },
        payment_status: "PAID",
      },
      status: "VALID",
    },
    select: {
      id: true,
      name: true,
      email: true,
      updatedAt: true,
      amount: true,
      commission: true,
      checkoutSession: {
        select: {
          id: true,
          orderItems: {
            select: {
              id: true,
              quantity: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
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
    result: purchases,
  };
});
