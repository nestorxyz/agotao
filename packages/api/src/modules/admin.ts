import z from "zod";
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
  }),
  validatePurchase: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const purchase = await ctx.prisma.purchase.update({
        where: {
          id: input.id,
        },
        data: {
          status: "VALID",
          checkoutSession: {
            update: {
              payment_status: "PAID",
            },
          },
        },
        select: {
          id: true,
          amount: true,
          commission: true,
          checkoutSession: {
            select: {
              company: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      if (!purchase)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not validate purchase",
        });

      // Add balance to company
      const company = await ctx.prisma.company.update({
        where: {
          id: purchase.checkoutSession.company.id,
        },
        data: {
          balance: {
            increment: purchase.amount - purchase.commission,
          },
        },
      });

      if (!company)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not update company balance",
        });

      // Add fees to admin
      const agotaoAdmin = await ctx.prisma.user.update({
        where: {
          uid: process.env.AGOTAO_ADMIN_ID,
        },
        data: {
          balance: {
            increment: purchase.commission,
          },
        },
      });

      if (!agotaoAdmin)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not update admin balance",
        });

      return {
        status: 200,
        message: "Purchase validated",
      };
    }),
});
