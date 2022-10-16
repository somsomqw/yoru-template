import z from "zod";

export const inputRegistReviewSchema = z.object({
  userEmail: z.string(),
  orderId: z.string(),
  productId: z.string(),
  score: z.number(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
});

export const inputCheckAlreadyRegistedSchema = z.object({
  orderId: z.string(),
  productId: z.string(),
});

export const outputCheckAlreadyRegistedSchema = z.object({
  isRegisted: z.boolean(),
});
