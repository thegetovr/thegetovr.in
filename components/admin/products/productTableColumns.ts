export interface ProductTableColumn {
  key:
    | "product"
    | "sku"
    | "category"
    | "price"
    | "stock"
    | "status"
    | "actions";
  label: string;
  align?: "left" | "right";
}

export const PRODUCT_TABLE_COLUMNS: ProductTableColumn[] = [
  {
    key: "product",
    label: "Product",
  },
  {
    key: "sku",
    label: "SKU",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "stock",
    label: "Stock",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
    align: "right",
  },
];