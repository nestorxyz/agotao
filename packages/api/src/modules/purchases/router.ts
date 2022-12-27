// Libraries
import { TRPCError } from "@trpc/server";

// tRPC
import { router, publicProcedure } from "../../trpc";

// Validators
import { guestPurchaseDTO } from "@acme/validations";

export const purchaseRouter = router({
  guest: publicProcedure
    .input(guestPurchaseDTO)
    .mutation(async ({ input, ctx }) => {
      const { name, email, product_id, payment_method_id } = input;

      const product = await ctx.prisma.product.findUnique({
        where: {
          id: product_id,
        },
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
        },
      });

      if (!product)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "El producto no existe",
        });

      const purchase = await ctx.prisma.purchase.create({
        data: {
          name,
          email,
          product_id,
          payment_method_id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          product: true,
          payment_method: true,
        },
      });

      if (!purchase)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo crear la compra",
        });

      return {
        status: 201,
        message: "Compra realizada con éxito",
        result: purchase,
      };
    }),
});
