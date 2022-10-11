import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  registUserSchema,
  getUserEmailSchema, 
} from "../../schema/user.schema";
import { prisma } from "../../utils/prisma";
import { Input } from "@chakra-ui/react";

export const userRouter = t.router({
  regist: t.procedure.input(registUserSchema).mutation(async ({ input }) => {
    const isEmailExisted = await prisma.user.findFirst({
      where: {
        email: input.email,
      },
    });
    if (isEmailExisted) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "This email is already existed",
      });
    } else {
      await prisma.user.create({ data: { ...input } });
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
