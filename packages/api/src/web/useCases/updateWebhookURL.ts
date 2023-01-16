import { TRPCError } from "@trpc/server";
import { updateWebhookURLSchema } from "@acme/validations";

import { protectedProcedure } from "../../trpc";

export const updateWebhookURL = protectedProcedure
  .input(updateWebhookURLSchema)
  .mutation(async ({ input, ctx }) => {
    const { webhook_url, company_id } = input;

    const updatedCompany = await ctx.prisma.company.update({
      where: {
        id: company_id,
      },
      data: {
        webhook_url,
      },
    });

    if (!updatedCompany)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No se pudo actualizar la URL del webhook",
      });

    return true;
  });
