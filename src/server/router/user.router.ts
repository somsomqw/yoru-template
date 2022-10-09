import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { registUserSchema } from "../../schema/user.schema";
import { prisma } from "../../utils/prisma";
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
});
