import { publicProcedure } from "../../trpc";

export const getPaymentMethods = publicProcedure.query(async ({ ctx }) => {
  const paymentMethods = await ctx.prisma.paymentMethod.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      keyInfo: true,
    },
  });

  return paymentMethods;
});
