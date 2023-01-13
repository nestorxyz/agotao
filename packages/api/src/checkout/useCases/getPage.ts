import z from "zod";
import { TRPCError } from "@trpc/server";

// tRPC
import { publicProcedure } from "../../trpc";

export const getPage = publicProcedure
  .input(z.string())
  .query(async ({ input, ctx }) => {
    const checkout = await ctx.prisma.checkout.findUnique({
      where: {
        id: input,
      },
    });

    if (!checkout)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Checkout no encontrado",
      });

    // Verificar que no ha pasado 15 minutos desde que se creó el checkout
    const now = new Date();
    const createdAt = new Date(checkout.createdAt);
    const diff = now.getTime() - createdAt.getTime();
    const minutes = Math.floor(diff / 1000 / 60);

    if (checkout.status === "VALID" && minutes > 15) {
      const updatedCheckout = await ctx.prisma.checkout.update({
        where: {
          id: checkout.id,
        },
        data: {
          status: "EXPIRED",
        },
      });

      return { ...updatedCheckout };
    }

    return { ...checkout };
  });
