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
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const editProductSchema = z.object({
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
  updatedAt: z.string(),
});

export const tableSingleProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  discount: z.boolean(),
  price: z.number(),
  quantity: z.number(),
  category: z.string(),
});

export const getSingleProductSchema = z.object({
  id: z.string(),
});

export const deleteProductSchema = z.object({
  id: z.string(),
});

export const tableProductsSchema = tableSingleProductSchema.array();

export type TableSingleProduct = z.TypeOf<typeof tableSingleProductSchema>;
export type RegistProductInput = z.TypeOf<typeof registProductSchema>;
export type EditProductInput = z.TypeOf<typeof editProductSchema>;
