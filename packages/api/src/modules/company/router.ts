// Libraries
import { TRPCError } from "@trpc/server";

// tRPC
import { router, protectedProcedure } from "../../trpc";

// Validators
import { createCompanySchema } from "@acme/validations";

export const companyRouter = router({
  create: protectedProcedure
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
          admin_id: ctx.session.user.id,
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
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const companies = await ctx.prisma.company.findMany({
      where: {
        admin_id: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
      },
    });

    if (!companies)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No se pudo obtener las empresas",
      });

    return {
      status: 200,
      message: "Empresas obtenidas correctamente",
      result: companies,
    };
  }),
});
