import z from "zod";

export const checkoutPurchaseDTO = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z
    .string({ required_error: "El email es requerido" })
    .email({ message: "El email no es válido" }),
  checkout_id: z.string({
    required_error: "El id del checkout es requerido",
  }),
  payment_method_id: z.string({
    required_error: "Selecciona un método de pago",
  }),
});

export type CheckoutPurchaseDTO = z.infer<typeof checkoutPurchaseDTO>;
