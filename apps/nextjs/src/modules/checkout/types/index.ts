import * as z from "zod";

export const paymentSchema = z.object({
  number: z.string().min(16).max(16),
  name: z.string().min(3).max(50),
  expiry: z.string().min(4).max(4),
  cvc: z.string().min(3).max(3),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
