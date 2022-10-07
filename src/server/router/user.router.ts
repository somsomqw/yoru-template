import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { loginUserSchema, registUserSchema } from "../../schema/user.schema";
import { prisma } from "../../utils/prisma";

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
});
