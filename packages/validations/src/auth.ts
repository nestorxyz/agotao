import * as z from "zod";

export const createUserDTO = z.object({
  uid: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  emailVerified: z.string().optional(),
  image: z.string().optional(),
});

export type CreateUserDTO = z.infer<typeof createUserDTO>;
