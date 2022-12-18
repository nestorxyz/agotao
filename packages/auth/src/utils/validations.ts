import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email("El email no es válido"),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const signupSchema = loginSchema.extend({});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignup = z.infer<typeof signupSchema>;
