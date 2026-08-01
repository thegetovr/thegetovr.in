export const PRODUCT_CATEGORIES = [
  "Oversized T-Shirt",
  "Classic T-Shirt",
  "Hoodie",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type ProductStatus = "active" | "draft" | "archived";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: ProductStatus;
}