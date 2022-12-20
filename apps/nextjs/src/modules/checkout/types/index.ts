import * as z from "zod";

export const paymentSchema = z.object({
  number: z
    .string({ required_error: "El número de tarjeta es requerido" })
    .min(15, "El número de tarjeta debe tener mínimo 15 dígitos"),
  name: z
    .string({ required_error: "El nombre del titular es requerido" })
    .min(3, "El nombre del titular debe tener mínimo 3 caracteres")
    .max(50, "El nombre del titular debe tener máximo 50 caracteres"),
  expiry: z
    .string({ required_error: "La fecha de expiración es requerida" })
    .min(5, "La fecha de expiración debe tener 4 caracteres")
    .max(5, "La fecha de expiración debe tener 4 caracteres"),
  cvc: z
    .string({ required_error: "El código de seguridad es requerido" })
    .min(3, "El código de seguridad debe tener 3 caracteres")
    .max(3, "El código de seguridad debe tener 3 caracteres"),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
