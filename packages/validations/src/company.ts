import * as z from "zod";

export const createCompanySchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  image: z.string(),
});

export type ICreateCompany = z.infer<typeof createCompanySchema>;
