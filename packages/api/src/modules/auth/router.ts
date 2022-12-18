// Libraries
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

// tRPC
import { router, publicProcedure } from "@/trpc";

// Validators
import { signupSchema } from "@/modules/auth/validations";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  signup: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Este usuario ya existe",
        });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.prisma.user.create({
        data: {
          username: email,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      return {
        status: 201,
        message: "Usuario creado correctamente",
        result: user,
      };
    }),
});
