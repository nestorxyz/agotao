import { z } from "zod";
import axios from "axios";
import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "../../trpc";
import { sendMail, PaymentValid } from "@acme/emails";
import { Dayjs } from "@agotao/utils";

export const validatePurchase = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const purchase = await ctx.prisma.paymentIntent.update({
      where: {
        id: input.id,
      },
      data: {
        status: "PAID",
      },
      select: {
        id: true,
        amount: true,
        commission: true,
        email: true,
        payment_method: {
          select: {
            id: true,
            name: true,
          },
        },
        checkout_session: {
          select: {
            metadata: true,
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
            company: {
              select: {
                id: true,
                name: true,
                image: true,
                sk_live: true,
                webhook_url: true,
              },
            },
          },
        },
      },
    });

    if (!purchase)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not validate purchase",
      });

    // Add balance to company
    const company = await ctx.prisma.company.update({
      where: {
        id: purchase.checkout_session.company.id,
      },
      data: {
        balance: {
          increment: purchase.amount - purchase.commission,
        },
      },
    });

    if (!company)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not update company balance",
      });

    // Add fees to admin
    const agotaoAdmin = await ctx.prisma.user.update({
      where: {
        uid: process.env.AGOTAO_ADMIN_ID,
      },
      data: {
        balance: {
          increment: purchase.commission,
        },
      },
    });

    if (!agotaoAdmin)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not update admin balance",
      });

    if (purchase.checkout_session.company.webhook_url) {
      try {
        await axios.post(
          purchase.checkout_session.company.webhook_url,
          {
            type: "succeeded",
            id: purchase.id,
            amount: purchase.amount,
            commission: purchase.commission,
            payment_method: purchase.payment_method.name,
            metadata: purchase.checkout_session.metadata,
          },
          {
            headers: {
              Authorization: `Bearer ${purchase.checkout_session.company.sk_live}`,
            },
          },
        );
      } catch (error) {
        console.log("webhookResponse error:", error);
      }
    }

    await sendMail({
      subject: `Tu recibo de ${purchase.checkout_session.company.name} id-${purchase.id}`,
      to: purchase.email,
      component: (
        <PaymentValid
          company_image={purchase.checkout_session.company.image}
          company_name={purchase.checkout_session.company.name}
          payment_intent_id={purchase.id}
          payment_method={purchase.payment_method.name}
          products={purchase.checkout_session.order_items.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            total: Dayjs.formatMoney(item.product.price * item.quantity),
          }))}
          total={Dayjs.formatMoney(purchase.amount)}
          date={Dayjs.dayjs
            .tz(new Date())
            .format("DD [de] MMMM [de] YYYY, h:mm a")}
          button_url={`https://checkout.agotao.com/compra/${purchase.id}`}
        />
      ),
    });

    return {
      status: 200,
      message: "Purchase validated",
    };
  });
