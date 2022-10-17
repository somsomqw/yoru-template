import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { prisma } from "../../utils/prisma";
import { Prisma } from "@prisma/client";
import {
  inputCheckAlreadyRegistedSchema,
  inputRegistReviewSchema,
  outputCheckAlreadyRegistedSchema,
} from "../../schema/review.schema";

export const reviewRouter = t.router({
  regist: t.procedure
    .input(inputRegistReviewSchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.review.create({
          data: {
            ...input,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          switch (e.code) {
            case "P2002":
              throw new trpc.TRPCError({
                code: "CONFLICT",
                message: "レビューは既に登録されています。",
              });
            default:
              throw new trpc.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "SYSTEM ERROR",
              });
          }
        }
        throw e;
      }
    }),
  checkAlreadyRegisted: t.procedure
    .input(inputCheckAlreadyRegistedSchema)
    .output(outputCheckAlreadyRegistedSchema)
    .query(async ({ input }) => {
      try {
        const review = await prisma.review.findFirst({
          where: {
            orderId: input.orderId,
            productId: input.productId,
          },
        });
        if (review) {
          return {
            isRegisted: true,
          };
        }
        return {
          isRegisted: false,
        };
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
});
