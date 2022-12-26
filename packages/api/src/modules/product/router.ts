// Libraries
import { TRPCError } from "@trpc/server";

// tRPC
import { router, protectedProcedure } from "../../trpc";

// Validators
import { createProductDTO } from "@acme/validations";

export const productRouter = router({
  create: protectedProcedure
    .input(createProductDTO)
    .mutation(async ({ input, ctx }) => {
      const { name, price, image, company_id } = input;

      const product = await ctx.prisma.product.create({
        data: {
          name,
          price: parseFloat(price),
          image,
          company_id,
          created_by: ctx.session.user.id,
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
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo crear el producto",
        });

      return {
        status: 201,
        message: "Producto creado correctamente",
        result: product,
      };
    }),
});
