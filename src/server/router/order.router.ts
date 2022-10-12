import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { prisma } from "../../utils/prisma";
import { Prisma } from "@prisma/client";
import {
  inputRegistOrderSchema,
  outputGetOrdersSchema,
} from "../../schema/order.schema";

export const orderRouter = t.router({
  regist: t.procedure
    .input(inputRegistOrderSchema)
    .mutation(async ({ input }) => {
      try {
        const newOrder = await prisma.order.create({
          data: {
            userEmail: input.userEmail,
            totalPrice: input.totalPrice,
            status: "PAYMENT_PROCEED",
          },
        });
        Promise.all(
          input.cartData.map(async (id) => {
            await prisma.cartData.update({
              where: {
                id,
              },
              data: {
                cartId: null,
                orderId: newOrder.id,
              },
            });
          })
        );
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "SYSTEM ERROR",
          });
        }
        throw e;
      }
    }),
  get: t.procedure.output(outputGetOrdersSchema).query(async () => {
    try {
      const orders = await prisma.order.findMany();
      return orders;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SYSTEM ERROR",
        });
      }
      throw e;
    }
  }),
  delete: t.procedure.mutation(async ({ input }) => {}),
  edit: t.procedure.mutation(async ({ input }) => {}),
});
