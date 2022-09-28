import z from "zod";

export const registUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});
