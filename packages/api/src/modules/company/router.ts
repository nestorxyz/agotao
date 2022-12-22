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

      const company = await ctx.prisma.company.create({
        data: {
          name,
          image,
          username: name.toLowerCase().replace(/\s/g, ""),
          admin_id: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
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
});
