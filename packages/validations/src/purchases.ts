import z from "zod";

export const guestPurchaseDTO = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z
    .string({ required_error: "El email es requerido" })
    .email({ message: "El email no es válido" }),
  product_id: z.string({ required_error: "El producto es requerido" }),
  payment_method_id: z.string({
    required_error: "Selecciona un método de pago",
  }),
});

export interface GuestPurchaseDTO extends z.infer<typeof guestPurchaseDTO> {}
