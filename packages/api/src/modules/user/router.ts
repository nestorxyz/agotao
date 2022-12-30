import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../../trpc";

// Validators
import { createUserDTO } from "@acme/validations";

export const userRouter = router({
  create: publicProcedure
    .input(createUserDTO)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.create({
        data: {
          ...input,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create user",
        });

      return {
        status: 201,
        message: "User created",
        data: user,
      };
    }),
  getLogged: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        uid: ctx.session.uid,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not get user",
      });

    return {
      status: 200,
      message: "User found",
      data: user,
    };
  }),
});
