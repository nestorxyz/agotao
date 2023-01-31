import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "../../../trpc";

export const getCompanies = protectedProcedure.query(async ({ ctx }) => {
  const allCompanies = await ctx.prisma.company.findMany({
    where: {
      admin_id: ctx.session.uid,
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      balance: true,
    },
  });

  if (!allCompanies)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No se encontraron empresas",
    });

  let company = allCompanies[0];

  return {
    status: 200,
    message: "Empresas obtenidas correctamente",
    result: {
      company,
      allCompanies,
    },
  };
});
