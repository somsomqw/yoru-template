import z from "zod";

export const registCategorySchema = z.object({
  name: z.string(),
});

export const deleteCategorySchema = z.object({
  name: z.string(),
});

export const editCategorySchema = z.object({
  targetName: z.string(),
  newName: z.string(),
});
