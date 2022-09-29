import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { loginUserSchema, registUserSchema } from "../../schema/user.schema";

export const userRouter = t.router({
  regist: t.procedure
    .input(registUserSchema)
    .mutation(async ({ ctx, input }) => {
      const COLLECTION_NAME = "users";
      const docRef = await ctx.db
        .collection(COLLECTION_NAME)
        .where("email", "==", input.email)
        .get();

      if (!docRef.empty) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "This email is already existed",
        });
      } else {
        const insertData = {
          email: input.email,
          password: input.password,
          isAdmin: false,
        };
        const res = await ctx.db
          .collection(COLLECTION_NAME)
          .doc()
          .set(insertData);
      }
    }),
});
