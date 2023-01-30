import { z } from "zod";
import axios from "axios";
import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "../../trpc";
import { sendMail } from "@acme/emails";
import { Dayjs } from "@agotao/utils";

// change payout status to PAID, send email to destinations, and send webhook to company
export const validatePayouts = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const payout = await ctx.prisma.payout.update({
      where: {
        id: input.id,
      },
      data: {
        status: "PAID",
      },
      select: {
        id: true,
        status: true,
        metadata: true,
        company: {
          select: {
            webhook_url: true,
            sk_live: true,
          },
        },
        items: {
          select: {
            name: true,
            email: true,
            memo: true,
            amount: true,
            fee: true,
            type: true,
            keyInfo: true,
          },
        },
      },
    });

    if (!payout)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not update payout",
      });

    if (payout.company.webhook_url) {
      try {
        await axios.post(
          payout.company.webhook_url,
          {
            type: "payout.succeeded",
            id: payout.id,
            status: payout.status,
            items: payout.items,
            metadata: payout.metadata,
          },
          {
            headers: {
              Authorization: `Bearer ${payout.company.sk_live}`,
            },
          },
        );
      } catch (error) {
        console.log("webhookResponse error:", error);
      }
    }
  });
