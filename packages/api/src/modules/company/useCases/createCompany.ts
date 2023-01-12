import { TRPCError } from "@trpc/server";

// tRPC
import { protectedProcedure } from "../../../trpc";

// Validators
import { createCompanySchema } from "@acme/validations";

export const createCompany = protectedProcedure
  .input(createCompanySchema)
  .mutation(async ({ input, ctx }) => {
    const { name, image } = input;

    let companyUsername = name.toLowerCase().replace(/\s/g, "");

    const usernameTaken = await ctx.prisma.company.findFirst({
      where: {
        username: companyUsername,
      },
    });

    if (usernameTaken)
      companyUsername = `${companyUsername}${Math.floor(
        Math.random() * 1000000,
      )}`;

    const company = await ctx.prisma.company.create({
      data: {
        name,
        image,
        username: companyUsername,
        admin_id: ctx.session.uid,
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
      },
    });

    if (!company)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No se pudo crear la empresa",
      });

    return {
      status: 201,
      message: "Empresa creada correctamente",
      result: company,
    };
  });
