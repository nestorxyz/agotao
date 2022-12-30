// Libraries
import { TRPCError } from "@trpc/server";
import sendMail, { Basic } from "@acme/emails";

// tRPC
import { router, publicProcedure, protectedProcedure } from "../../trpc";

// Validators
import { guestPurchaseDTO, getCompanySalesDTO } from "@acme/validations";

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

      await sendMail({
        subject: `Compra realizada por ${name}`,
        to: "nmamanipantoja@gmail.com",
        component: (
          <Basic
            name={name}
            email={email}
            product_name={product.name}
            price={product.price}
            payment_method={purchase.payment_method.name}
          />
        ),
      });

      return {
        status: 201,
        message: "Compra realizada con éxito",
        result: purchase,
      };
    }),
  getUserSales: protectedProcedure.query(async ({ ctx }) => {
    const sales = await ctx.prisma.purchase.findMany({
      where: {
        product: {
          company: {
            admin_id: ctx.session.uid,
          },
        },
        status: "VALID",
      },
      select: {
        id: true,
        name: true,
        email: true,
        product: {
          select: {
            name: true,
            price: true,
          },
        },
        payment_method: true,
        updatedAt: true,
      },
    });

    return {
      status: 200,
      message: "Ventas obtenidas con éxito",
      result: sales,
    };
  }),
});
