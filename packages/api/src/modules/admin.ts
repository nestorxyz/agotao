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
        commission: true,
        status: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            company: {
              select: {
                id: true,
                name: true,
                admin: {
                  select: {
                    uid: true,
                    name: true,
                    email: true,
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
      const purchase = await ctx.prisma.purchase.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          commission: true,
          product: {
            select: {
              id: true,
              price: true,
              company: {
                select: {
                  id: true,
                  balance: true,
                },
              },
            },
          },
        },
      });

      if (!purchase)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not get purchase",
        });

      const updatedPurchase = await ctx.prisma.purchase.update({
        where: {
          id: input.id,
        },
        data: {
          status: "VALID",
        },
      });

      if (!updatedPurchase)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not validate purchase",
        });

      // Add balance to company
      const company = await ctx.prisma.company.update({
        where: {
          id: purchase.product.company.id,
        },
        data: {
          balance: {
            increment: purchase.product.price - purchase.commission,
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
        data: updatedPurchase,
      };
    }),
});
