// Libraries
import { TRPCError } from "@trpc/server";
import { sendMail, BasicMail, PaymentIntentMail } from "@acme/emails";
import { checkoutPurchaseDTO } from "@acme/validations";

// tRPC
import { publicProcedure } from "../../trpc";

import { calculateComission } from "../../utils/pricing";
import { Dayjs } from "@agotao/utils";

export const purchase = publicProcedure
  .input(checkoutPurchaseDTO)
  .mutation(async ({ input, ctx }) => {
    const { name, email, checkout_id, payment_method_id } = input;

    const checkoutSession = await ctx.prisma.checkoutSession.findUnique({
      where: {
        id: checkout_id,
      },
      include: {
        payment_intent: {
          select: {
            id: true,
            status: true,
          },
        },
        order_items: {
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

    if (checkoutSession.payment_intent)
      throw new TRPCError({
        message: "El checkout ya fue utilizado",
        code: "BAD_REQUEST",
      });

    if (checkoutSession.status === "EXPIRED")
      throw new TRPCError({
        message: "El checkout ya expiró",
        code: "BAD_REQUEST",
      });

    const total_to_pay = checkoutSession.order_items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    const purchase = await ctx.prisma.paymentIntent.create({
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
        amount: true,
        commission: true,
        email: true,
        payment_method: {
          select: {
            name: true,
            keyInfo: true,
          },
        },
        checkout_session: {
          select: {
            company: {
              select: {
                name: true,
                image: true,
              },
            },
            order_items: {
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
            success_url: true,
            cancel_url: true,
            expires_at: true,
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

    const paymentIntentMail = sendMail({
      subject: `Completa en pago de tu compra en ${purchase.checkout_session.company.name}`,
      to: purchase.email,
      component: (
        <PaymentIntentMail
          company_image={purchase.checkout_session.company.image}
          company_name={purchase.checkout_session.company.name}
          payment_method={purchase.payment_method.name}
          payment_method_info={purchase.payment_method.keyInfo}
          products={purchase.checkout_session.order_items.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            total: Dayjs.formatMoney(item.product.price * item.quantity),
          }))}
          total={Dayjs.formatMoney(purchase.amount)}
          expires_at={Dayjs.dayjs
            .tz(purchase.checkout_session.expires_at)
            .format("DD [de] MMMM [de] YYYY, h:mm a")}
          button_url={`https://checkout.agotao/compra/${purchase.id}`}
        />
      ),
    });

    const adminMustVerifyEmail = sendMail({
      subject: `Compra realizada por ${name}`,
      to: "nmamanipantoja@gmail.com",
      component: (
        <BasicMail
          name={name}
          email={email}
          product_name={checkoutSession.order_items[0]!.product.name} // eslint-disable-line
          price={total_to_pay}
          payment_method={purchase.payment_method.name}
        />
      ),
    });

    await Promise.all([paymentIntentMail, adminMustVerifyEmail]);

    return {
      message: "Compra exitosa",
      result: {
        ...purchase,
      },
    };
  });
