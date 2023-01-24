import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "../../trpc";
import { sendMail, PaymentInvalid } from "@acme/emails";
import { Dayjs } from "@agotao/utils";

export const invalidatePurchase = protectedProcedure
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
        status: "UNPAID",
      },
      select: {
        id: true,
        amount: true,
        commission: true,
        name: true,
        email: true,
        payment_method: {
          select: {
            id: true,
            name: true,
            keyInfo: true,
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
        message: "Could not invalidate purchase",
      });

    await sendMail({
      subject: `Compra en ${purchase.checkout_session.company.name} id-${purchase.id}`,
      to: purchase.email,
      component: (
        <PaymentInvalid
          name={purchase.name}
          company_name={purchase.checkout_session.company.name}
          payment_method={purchase.payment_method.name}
          payment_method_info={purchase.payment_method.keyInfo}
          total={Dayjs.formatMoney(purchase.amount)}
          date={Dayjs.dayjs
            .tz(new Date())
            .format("DD [de] MMMM [de] YYYY, h:mm a")}
        />
      ),
    });

    return {
      status: 200,
      message: "Purchase Invalidated",
    };
  });
