import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  deleteProductSchema,
  editProductSchema,
  getSingleProductSchema,
  registProductSchema,
} from "../../schema/product.schema";

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
  get: t.procedure.query(async ({ ctx }) => {
    const productsSnapshot = await ctx.db.collection(COLLECTION_NAME).get();
    const products = productsSnapshot.docs.map((doc: any) => doc.data());
    return {
      products,
    };
  }),
  getSingle: t.procedure
    .input(getSingleProductSchema)
    .query(async ({ ctx, input }) => {
      const productSnapshot = await ctx.db
        .collection(COLLECTION_NAME)
        .where("id", "==", input.id)
        .get();
      if (productSnapshot.empty) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "This product is not exist",
        });
      } else {
        return {
          product: productSnapshot.docs[0].data(),
        };
      }
    }),
  delete: t.procedure
    .input(deleteProductSchema)
    .mutation(async ({ ctx, input }) => {
      const targetCategory = await ctx.db
        .collection(COLLECTION_NAME)
        .where("id", "==", input.id)
        .get();
      if (targetCategory.empty) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "This product is already deleted",
        });
      } else {
        await targetCategory.docs[0].ref.delete();
      }
    }),
  edit: t.procedure
    .input(editProductSchema)
    .mutation(async ({ ctx, input }) => {
      const targetCategory = await ctx.db
        .collection(COLLECTION_NAME)
        .where("id", "==", input.id)
        .get();
      if (targetCategory.empty) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "This product is already deleted",
        });
      } else {
        await targetCategory.docs[0].ref.update({ ...input });
      }
    }),
});
