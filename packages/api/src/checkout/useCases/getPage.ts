import z from "zod";
import { TRPCError } from "@trpc/server";

// tRPC
import { publicProcedure } from "../../trpc";

export const getPage = publicProcedure
  .input(z.string())
  .query(async ({ input, ctx }) => {
    const checkout = await ctx.prisma.checkoutSession.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        company: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
        status: true,
        createdAt: true,
        cancel_url: true,
        orderItems: {
          select: {
            id: true,
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true,
              },
            },
            quantity: true,
          },
        },
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
      const updatedCheckout = await ctx.prisma.checkoutSession.update({
        where: {
          id: checkout.id,
        },
        data: {
          status: "EXPIRED",
        },
        select: {
          id: true,
          company: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
          status: true,
          createdAt: true,
          cancel_url: true,
          orderItems: {
            select: {
              id: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  price: true,
                },
              },
              quantity: true,
            },
          },
        },
      });

      return { ...updatedCheckout };
    }

    return { ...checkout };
  });
