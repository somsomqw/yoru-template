import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  deleteCategorySchema,
  editCategorySchema,
  registCategorySchema,
} from "../../schema/category.schema";

const COLLECTION_NAME = "categories";

export const categoryRouter = t.router({
  regist: t.procedure
    .input(registCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const categoryCollection = await ctx.db
        .collection(COLLECTION_NAME)
        .limit(1)
        .get();
      const docRef = await ctx.db
        .collection(COLLECTION_NAME)
        .where("name", "==", input.name)
        .get();

      //if collection is existed and same name is exsisted
      if (!categoryCollection.empty && !docRef.empty) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "This category is already existed",
        });
      } else {
        const insertData = {
          name: input.name,
        };
        const res = await ctx.db
          .collection(COLLECTION_NAME)
          .doc()
          .set(insertData);
      }
    }),
  get: t.procedure.query(async ({ ctx }) => {
    const categoriesSnapshot = await ctx.db.collection(COLLECTION_NAME).get();
    const categories = categoriesSnapshot.docs.map((doc: any) => doc.data());
    return {
      categories,
    };
  }),
  delete: t.procedure
    .input(deleteCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const targetCategory = await ctx.db
        .collection(COLLECTION_NAME)
        .where("name", "==", input.name)
        .get();
      if (targetCategory.empty) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "This category is already deleted",
        });
      } else {
        await targetCategory.docs[0].ref.delete();
      }
    }),
  edit: t.procedure
    .input(editCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const targetCategory = await ctx.db
        .collection(COLLECTION_NAME)
        .where("name", "==", input.targetName)
        .get();
      if (targetCategory.empty) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "This category is already deleted",
        });
      } else {
        await targetCategory.docs[0].ref.update({ name: input.newName });
      }
    }),
});
