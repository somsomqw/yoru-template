import z, { number } from "zod";

export const registCartSchema = z.object({
  productId: z.string(),
  title: z.string(),
  size: z.nullable(z.string()),
  color: z.nullable(z.string()),
  price: z.number(),
  quantity: z.number(),
  cartId: z.string(),
});

export const inputGetCartSchema = z.object({
  cartId: z.string(),
});

export const outputGetCartSchema = z.object({
  products: z.nullable(
    z
      .object({
        id: z.string(),
        productId: z.string(),
        title: z.string(),
        size: z.nullable(z.string()),
        color: z.nullable(z.string()),
        quantity: z.number(),
        price: z.number(),
      })
      .array()
  ),
});

export const inputDeleteCartSchema = z.object({
  cartDataId: z.string(),
});

export type OutputGetCart = z.TypeOf<typeof outputGetCartSchema>;
