import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "../../../trpc";

export const getPayouts = protectedProcedure
  .input(
    z.object({
      company_id: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const allPayouts = await ctx.prisma.payout.findMany({
      where: {
        company_id: input.company_id,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        items: {
          select: {
            id: true,
            name: true,
            email: true,
            memo: true,
            amount: true,
            fee: true,
            type: true,
            keyInfo: true,
            updatedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!allPayouts)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No se encontraron retiros",
      });

    return {
      status: 200,
      message: "Retiros obtenidos correctamente",
      result: allPayouts,
    };
  });
