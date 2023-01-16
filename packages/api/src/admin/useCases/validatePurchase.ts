import { z } from "zod";
import axios from "axios";
import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "../../trpc";

export const validatePurchase = protectedProcedure
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
        payment_method: {
          select: {
            id: true,
            name: true,
          },
        },
        checkoutSession: {
          select: {
            metadata: true,
            company: {
              select: {
                id: true,
                sk_live: true,
                webhook_url: true,
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

    if (purchase.checkoutSession.company.webhook_url) {
      // Send webhook to company with auth bearer
      const webhookResponse = await axios.post(
        purchase.checkoutSession.company.webhook_url,
        {
          type: "succeeded",
          id: purchase.id,
          amount: purchase.amount,
          commission: purchase.commission,
          payment_method: purchase.payment_method.name,
          metadata: purchase.checkoutSession.metadata,
        },
        {
          headers: {
            Authorization: `Bearer ${purchase.checkoutSession.company.sk_live}`,
          },
        },
      );

      if (!webhookResponse)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not send webhook to company",
        });

      console.log("webhookResponse:", webhookResponse);
    }

    return {
      status: 200,
      message: "Purchase validated",
    };
  });
