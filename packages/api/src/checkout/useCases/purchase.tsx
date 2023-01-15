// Libraries
import { TRPCError } from "@trpc/server";
import sendMail, { Basic } from "@acme/emails";
import { checkoutPurchaseDTO } from "@acme/validations";

// tRPC
import { publicProcedure } from "../../trpc";

import { calculateComission } from "../../utils/pricing";

export const purchase = publicProcedure
  .input(checkoutPurchaseDTO)
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
        amount: total_to_pay,
      },
      select: {
        id: true,
        payment_method: {
          select: {
            name: true,
          },
        },
        checkoutSession: {
          select: {
            success_url: true,
            cancel_url: true,
          },
        },
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
      result: {
        ...purchase,
      },
    };
  });
