import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { registProductSchema } from "../../schema/product.schema";

const COLLECTION_NAME = "products";

export const productRouter = t.router({
  regist: t.procedure
    .input(registProductSchema)
    .mutation(async ({ ctx, input }) => {
      const categoryCollection = await ctx.db
        .collection(COLLECTION_NAME)
        .limit(1)
        .get();
      const docRef = await ctx.db
        .collection(COLLECTION_NAME)
        .where("id", "==", input.id)
        .get();

      //if collection is existed and same name is exsisted
      if (!categoryCollection.empty && !docRef.empty) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "This product id is already existed",
        });
      } else {
        const insertData = {
          ...input,
        };
        const res = await ctx.db
          .collection(COLLECTION_NAME)
          .doc()
          .set(insertData);
      }
    }),
});
