import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),

  sku: z.string().trim().min(1, "SKU is required"),

  category: z.string().trim().min(1, "Category is required"),

  type: z.enum([
    "ready-made",
    "customizable",
  ]),

  price: z.coerce
    .number()
    .min(0, "Price cannot be negative"),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  status: z.enum([
    "active",
    "draft",
    "archived",
  ]),
});

export type ProductInput = z.infer<typeof productSchema>;