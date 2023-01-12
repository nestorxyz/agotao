import z from "zod";

// Libraries
import { TRPCError } from "@trpc/server";
import sendMail, { Whatever } from "@acme/emails";

// tRPC
import { router, protectedProcedure } from "../../trpc";

import { createCompany } from "./useCases";

export const companyRouter = router({
  create: createCompany,
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const companies = await ctx.prisma.company.findMany({
      where: {
        admin_id: ctx.session.uid,
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        balance: true,
        products: {
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
          },
        },
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
  requestPayout: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const company = await ctx.prisma.company.findFirst({
        where: {
          id,
          admin_id: ctx.session.uid,
        },
        select: {
          id: true,
          name: true,
          balance: true,
          admin: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });

      if (!company)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No se encontró la empresa",
        });

      await sendMail({
        subject: `Quieren payout por ${company.name}`,
        to: "nmamanipantoja@gmail.com",
        component: (
          <Whatever>
            <p>Nombre: {company.name}</p>
            <p>Balance: {company.balance}</p>
            <p>Correo: {company.admin.email}</p>
            <p>Nombre: {company.admin.name}</p>
          </Whatever>
        ),
      });

      return {
        status: 201,
        message: "Retiro solicitado correctamente",
        result: {},
      };
    }),
});