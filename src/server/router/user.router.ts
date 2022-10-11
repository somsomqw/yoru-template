import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  registUserSchema,
  getUserEmailSchema, 
} from "../../schema/user.schema";
import { prisma } from "../../utils/prisma";
import { Input } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";

export const userRouter = t.router({
  regist: t.procedure.input(registUserSchema).mutation(async ({ input }) => {
    try {
      await prisma.user.create({ data: { ...input } });
      await prisma.cart.create({
        data: { userEmail: input.email },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case "P2002":
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "This email is already existed",
            });
        }
      }
      throw e;
    }
  }),
  get: t.procedure
    .input(getUserEmailSchema)
    .query(async ({input}) =>{
      const userSnapshot = await prisma.user.findFirst({
        where: {
          email: input.email
        },
      })
      return userSnapshot
  }),
});
