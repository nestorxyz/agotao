import z from "zod";

// Libraries
import { TRPCError } from "@trpc/server";
import sendMail, { Basic } from "@acme/emails";

// tRPC
import { publicProcedure } from "../../trpc";

import { calculateComission } from "../../utils/pricing";

export const purchase = publicProcedure
  .input(
    z.object({
      name: z
        .string({ required_error: "El nombre es requerido" })
        .min(3, "El nombre debe tener al menos 3 caracteres"),
      email: z
        .string({ required_error: "El email es requerido" })
        .email({ message: "El email no es válido" }),
      checkout_id: z.string({
        required_error: "El id del checkout es requerido",
      }),
      payment_method_id: z.string({
        required_error: "Selecciona un método de pago",
      }),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { name, email, checkout_id, payment_method_id } = input;

    const checkoutSession = await ctx.prisma.checkoutSession.findUnique({
      where: {
        id: checkout_id,
      },
      include: {
        orderItems: {
          select: {
            quantity: true,
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!checkoutSession)
      throw new TRPCError({
        message: "El checkout no existe",
        code: "BAD_REQUEST",
      });

    if (checkoutSession.payment_status === "PAID")
      throw new TRPCError({
        message: "El checkout ya fue pagado",
        code: "BAD_REQUEST",
      });

    if (checkoutSession.status === "EXPIRED")
      throw new TRPCError({
        message: "El checkout ya expiró",
        code: "BAD_REQUEST",
      });

    const total_to_pay = checkoutSession.orderItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    const purchase = await ctx.prisma.purchase.create({
      data: {
        name,
        email,
        checkout_session_id: checkout_id,
        payment_method_id,
        commission: calculateComission(total_to_pay),
      },
      include: {
        payment_method: true,
      },
    });

    if (!purchase) {
      throw new TRPCError({
        message: "El pago no se pudo completar",
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    await sendMail({
      subject: `Compra realizada por ${name}`,
      to: "nmamanipantoja@gmail.com",
      component: (
        <Basic
          name={name}
          email={email}
          product_name={checkoutSession.orderItems[0]!.product.name} // eslint-disable-line
          price={total_to_pay}
          payment_method={purchase.payment_method.name}
        />
      ),
    });

    return {
      message: "Compra exitosa",
    };
  });
