// Libraries
import { TRPCError } from "@trpc/server";
import { sendMail, PaymentIntentMail } from "@acme/emails";
import { checkoutPurchaseDTO } from "@acme/validations";

// tRPC
import { publicProcedure } from "../../trpc";

import { Dayjs } from "@agotao/utils";
import { calculateComission } from "../../utils/pricing";
import { TelegramBotSingleton } from "../../utils/agotao-admin-bot";

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
          button_url={`https://checkout.agotao.com/compra/${purchase.id}`}
        />
      ),
    });

    const telegramAdminBot = TelegramBotSingleton.getInstance(
      process.env.TELEGRAM_BOT_TOKEN as string,
    ).getBot();

    const adminMustVerifyTelegram = telegramAdminBot.sendMessage(
      process.env.TELEGRAM_ADMIN_CHAT_ID as string,
      `🛒 *Nueva compra* 🛒

      *Nombre:* ${name}
      *Email:* ${email}
      *Monto:* ${Dayjs.formatMoney(total_to_pay)}
      *Método de pago:* ${purchase.payment_method.name}
      *Expira:* ${Dayjs.dayjs
        .tz(purchase.checkout_session.expires_at)
        .format("DD [de] MMMM [de] YYYY, h:mm a")}`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Validar",
                callback_data: `validate_payment_intent:${purchase.id}`,
              },
              {
                text: "Rechazar",
                callback_data: `reject_payment_intent:${purchase.id}`,
              },
            ],
          ],
        },
      },
    );

    try {
      await Promise.all([paymentIntentMail, adminMustVerifyTelegram]);
    } catch (error) {
      console.error("Error at checkout purchase: ", error);

      return {
        message: "Compra exitosa",
        result: {
          ...purchase,
        },
      };
    }

    return {
      message: "Compra exitosa",
      result: {
        ...purchase,
      },
    };
  });
