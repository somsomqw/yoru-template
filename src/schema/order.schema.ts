import z, { number } from "zod";

export const inputRegistOrderSchema = z.object({
  userEmail: z.string(),
  totalPrice: z.number(),
  cartData: z.number().array(),
});

export const outputGetOrdersSchema = z
  .object({
    id: z.string(),
    userEmail: z.string(),
    totalPrice: z.number(),
    createdAt: z.date(),
    status: z.string(),
  })
  .array();

export const outputGetOrdersTodaySchema = z
  .object({
    totalPrice: z.number(),
  })
  .array();

export type InputRegistOrderSchema = z.TypeOf<typeof inputRegistOrderSchema>;
export type OutputGetOrdersSchema = z.TypeOf<typeof outputGetOrdersSchema>;
