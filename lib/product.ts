import type { Product, ProductColor, ProductSize } from "@/types/design";

export const PRODUCTS: Record<
  Product,
  {
    label: string;
    basePrice: number;
    colors: ProductColor[];
    sizes: ProductSize[];
  }
> = {
  hoodie: {
    label: "Hoodie",
    basePrice: 1499,
    colors: ["black", "white", "gray", "green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },

  oversized: {
    label: "Oversized T-Shirt",
    basePrice: 1199,
    colors: ["black", "white", "gray", "green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },

  tshirt: {
    label: "Classic T-Shirt",
    basePrice: 999,
    colors: ["black", "white", "gray", "green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
};

export const COLORS: Record<
  ProductColor,
  {
    label: string;
    className: string;
  }
> = {
  black: {
    label: "Black",
    className: "bg-black",
  },
  white: {
    label: "White",
    className: "bg-white",
  },
  gray: {
    label: "Gray",
    className: "bg-gray-400",
  },
  green: {
    label: "Green",
    className: "bg-green-700",
  },
};
export const COLOR_LABELS = Object.fromEntries(
  Object.entries(COLORS).map(([key, value]) => [key, value.label])
) as Record<ProductColor, string>;
export const PRINT_SIDE_LABELS = {
  front: "Front Print",
  back: "Back Print",
  both: "Front & Back Print",
} as const;
