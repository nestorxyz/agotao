import z from "zod";
import generateApiKey from "generate-api-key";
import { TRPCError } from "@trpc/server";

// tRPC
import { protectedProcedure } from "../../../trpc";

export const createSecretKey = protectedProcedure
  .input(
    z.object({
      company_id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { company_id } = input;

    const company = await ctx.prisma.company.findFirst({
      where: {
        id: company_id,
        admin_id: ctx.session.uid,
      },
    });

    if (!company)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No se encontró la empresa",
      });

    const secretKey = generateApiKey({
      method: "uuidv4",
      dashes: false,
      prefix: "sk_live_",
    }) as string;

    const updatedCompany = await ctx.prisma.company.update({
      where: {
        id: company_id,
      },
      data: {
        sk_live: secretKey,
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        sk_live: true,
      },
    });

    if (!updatedCompany)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No se pudo crear la secret key",
      });

    return {
      status: 201,
      message: "Secret key creada correctamente",
      result: updatedCompany,
    };
  });
