import z, { number } from "zod";

export const registCartSchema = z.object({
  productId: z.number(),
  title: z.string(),
  size: z.nullable(z.string()),
  color: z.nullable(z.string()),
  quantity: z.number(),
  cartId: z.number(),
});

export const inputGetCartSchema = z.object({
  cartId: z.number(),
});

export const outputGetCartSchema = z.object({
  products: z.nullable(
    z
      .object({
        productId: z.number(),
        title: z.string(),
        size: z.nullable(z.string()),
        color: z.nullable(z.string()),
        quantity: z.number(),
      })
      .array()
  ),
});

export type OutputGetCart = z.TypeOf<typeof outputGetCartSchema>;
