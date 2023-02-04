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
    const pageData = await ctx.prisma.paymentIntent.findMany({
      where: {
        checkout_session: {
          company_id: input.company_id,
        },
        status: "PAID",
      },
      select: {
        id: true,
        name: true,
        email: true,
        amount: true,
        checkout_session: {
          select: {
            order_items: {
              select: {
                quantity: true,
                product: {
                  select: {
                    name: true,
                    price: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
        updatedAt: true,
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
