import { z } from "zod";

const homeCategorySchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1, "Category title is required"),
  subtitle: z.string().trim().min(1, "Category subtitle is required"),
  link: z.string().trim().min(1, "Category link is required"),
  order: z.number().int().min(1),
  enabled: z.boolean(),
});

export const homeCategoriesSchema = z.array(homeCategorySchema);

export type HomeCategoriesInput = z.infer<
  typeof homeCategoriesSchema
>;