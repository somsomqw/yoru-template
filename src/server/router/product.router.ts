import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  deleteProductSchema,
  editProductSchema,
  getSingleProductSchema,
  inputGetProductsByCategoryId,
  inputSearchByTitle,
  outputGetProductsByCategoryId,
  outputSearchByTitle,
  outputSingleProductSchema,
  outputTableProductsSchema,
  registProductSchema,
} from "../../schema/product.schema";
import { Prisma } from "@prisma/client";
import { prisma } from "../../utils/prisma";

export const productRouter = t.router({
  regist: t.procedure.input(registProductSchema).mutation(async ({ input }) => {
    try {
      await prisma.product.create({
        data: {
          ...input,
        },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SYSTEM ERROR",
        });
      }
      throw e;
    }
  }),
  get: t.procedure.output(outputTableProductsSchema).query(async () => {
    try {
      const products = await prisma.product.findMany({
        include: { category: true },
      });
      return products;
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
  getSingle: t.procedure
    .input(getSingleProductSchema)
    .output(outputSingleProductSchema)
    .query(async ({ input }) => {
      try {
        const product = await prisma.product.findUnique({
          where: { id: input.id },
        });
        return product;
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
  getProductsByCategoryId: t.procedure
    .input(inputGetProductsByCategoryId)
    .output(outputGetProductsByCategoryId)
    .query(async ({ input }) => {
      try {
        const products = await prisma.product.findMany({
          where: { categoryId: input.id },
          include: {
            category: true,
          },
        });
        return products;
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
  delete: t.procedure.input(deleteProductSchema).mutation(async ({ input }) => {
    try {
      await prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case "P2025":
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Record to delete does not exist.",
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
  edit: t.procedure
    .input(editProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await prisma.product.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          switch (e.code) {
            case "P2025":
              throw new trpc.TRPCError({
                code: "CONFLICT",
                message: "Record to delete does not exist.",
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
  searchByTitle: t.procedure
    .input(inputSearchByTitle)
    .output(outputSearchByTitle)
    .query(async ({ input }) => {
      try {
        const items = await prisma.product.findMany({
          where: {
            title: {
              contains: input.title,
            },
          },
        });
        return items;
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
