export interface ProductMedia {
  url: string;
  publicId: string;
  alt: string;
  isCover: boolean;
  order: number;
}

export type ProductStatus =
  | "active"
  | "draft"
  | "archived";

export type ProductCategory = string;

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  type: ProductType;
  price: number;
  stock: number;
  status: ProductStatus;
  media: ProductMedia[];
}
export type ProductType =
  | "ready-made"
  | "customizable";