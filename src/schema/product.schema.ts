import z from "zod";

export const registProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  discount: z.boolean(),
  discountRate: z.nullable(z.number()),
  price: z.number(),
  quantity: z.number(),
  category: z.string(),
  thumbnail: z.nullable(z.string()),
  images: z.nullable(z.string().array()),
  size: z.string().array().optional(),
  color: z.string().array().optional(),
  rating: z.number().array().optional(),
  comments: z.string().array().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type RegistProductInput = z.TypeOf<typeof registProductSchema>;
