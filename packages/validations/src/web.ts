import z from "zod";

export const updateWebhookURLSchema = z.object({
  company_id: z
    .string({
      required_error: "El ID de la compañía es requerido",
    })
    .min(1, {
      message: "El ID de la compañía debe ser un texto",
    }),
  webhook_url: z
    .string({
      invalid_type_error: "La URL del webhook debe ser un texto",
    })
    .url({
      message: "La URL del webhook debe ser una URL válida",
    })
    .optional(),
});

export type UpdateWebhookURL = z.infer<typeof updateWebhookURLSchema>;
