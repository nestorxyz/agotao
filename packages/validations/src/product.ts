import z from "zod";

export const createProductDTO = z.object({
  name: z
    .string({ required_error: "El nombre del producto es requerido" })
    .min(1, {
      message: "El nombre del producto debe tener al menos 1 caracter",
    })
    .max(50, {
      message: "El nombre del producto debe tener máximo 50 caracteres",
    }),
  price: z
    .string({ required_error: "El precio del producto es requerido" })
    .min(0),
  image: z
    .string({ required_error: "La imagen del producto es requerida" })
    .url({ message: "La imagen del producto debe ser una URL válida" }),
  company_id: z.string({ required_error: "El ID de la empresa es requerido" }),
});

export type CreateProductDTO = z.infer<typeof createProductDTO>;
