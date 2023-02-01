import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "../../../trpc";

const getPageData = protectedProcedure
  .input(
    z.object({
      company_id: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const pageData = await ctx.prisma.company.findUnique({
      where: {
        id: input.company_id,
      },
      select: {
        id: true,
        sk_live: true,
        webhook_url: true,
      },
    });

    if (!pageData)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No se encontraron datos",
      });

    return pageData;
  });

export default getPageData;
