import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  registAddressSchema,
  getAddressSchema,
  getSingleAddressSchema,
  outSingleAddressSchema,
  deleteAddressSchema,
  editAddressSchema,
} from "../../schema/address.schema";
import { prisma } from "../../utils/prisma";
import { Input } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";

export const addressRouter = t.router({
  regist: t.procedure.input(registAddressSchema).mutation(async ({ input }) => {
    try {
      console.log("input----------" + input.isDefault);
      await prisma.address.create({
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
              message: "This address is already existed",
            });
        }
      }
      throw e;
    }
  }),
  get: t.procedure.input(getAddressSchema).query(async ({ input }) => {
    try {
      const addresses = await prisma.address.findMany({
        where: {
          userEmail: input.userEmail,
        },
      });
      return addresses;
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
    .input(getSingleAddressSchema)
    .output(outSingleAddressSchema)
    .query(async ({ input }) => {
      try {
        const address = await prisma.address.findUnique({
          where: { id: input.id },
        });
        return address;
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
  delete: t.procedure.input(deleteAddressSchema).mutation(async ({ input }) => {
    try {
      await prisma.address.delete({
        where: { id: input.id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case "P2025":
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Record to delete does not exist.",
            });
        }
      }
      throw e;
    }
  }),
  edit: t.procedure.input(editAddressSchema).mutation(async ({ input }) => {
    try {
      console.log("input----------" + input.isDefault);
      await prisma.address.update({
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
});
