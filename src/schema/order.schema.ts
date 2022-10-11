import z, { number } from "zod";

export const inputRegistOrderSchema = z.object({
  cartId: z.number(),
  totalPrice: z.number(),
});

export type InputRegistSchema = z.TypeOf<typeof inputRegistOrderSchema>;
