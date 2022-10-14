import z from "zod";

export const inputRegistOrderSchema = z.object({
  userEmail: z.string(),
  totalPrice: z.number(),
  cartData: z.string().array(),
});

export const inputGetSingleOrderSchema = z.object({
  id: z.string(),
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

export const outputGetOrdersTodaySchema = z.object({
  dailyTotal: z.number(),
  monthlyTotal: z.number(),
  dailyGrowthRate: z.number(),
  monthlyGrowthRate: z.number(),
});

export const outputGetMonthlyOrders = z.object({
  jan: z.object({ totalPrice: z.number() }).array(),
  feb: z.object({ totalPrice: z.number() }).array(),
  mar: z.object({ totalPrice: z.number() }).array(),
  apr: z.object({ totalPrice: z.number() }).array(),
  may: z.object({ totalPrice: z.number() }).array(),
  jun: z.object({ totalPrice: z.number() }).array(),
  jul: z.object({ totalPrice: z.number() }).array(),
  aug: z.object({ totalPrice: z.number() }).array(),
  sep: z.object({ totalPrice: z.number() }).array(),
  oct: z.object({ totalPrice: z.number() }).array(),
  nov: z.object({ totalPrice: z.number() }).array(),
  dec: z.object({ totalPrice: z.number() }).array(),
});

export const outputGetSingleOrderSchema = z.nullable(
  z.object({
    id: z.string(),
    userEmail: z.string(),
    products: z
      .object({
        id: z.string(),
        productId: z.string(),
        title: z.string(),
        size: z.nullable(z.string()),
        color: z.nullable(z.string()),
        quantity: z.number(),
        price: z.number(),
      })
      .array(),
    status: z.string(),
    totalPrice: z.number(),
    createdAt: z.date(),
  })
);

export type InputRegistOrderSchema = z.TypeOf<typeof inputRegistOrderSchema>;
export type OutputGetOrdersSchema = z.TypeOf<typeof outputGetOrdersSchema>;
export type OutputGetOrdersTodaySchema = z.TypeOf<
  typeof outputGetOrdersTodaySchema
>;
export type OutputGetMonthlyOrders = z.TypeOf<typeof outputGetMonthlyOrders>;
