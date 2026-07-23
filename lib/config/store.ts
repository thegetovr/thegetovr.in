import type { Product } from "@/types/design";

export const STORE_CONFIG = {
  currency: "INR",

  products: {
    tshirt: {
      name: "T-Shirt",
      basePrice: 699,
      doubleSideCharge: 200,
      enabled: true,
    },

    oversized: {
      name: "Oversized T-Shirt",
      basePrice: 899,
      doubleSideCharge: 200,
      enabled: true,
    },

    hoodie: {
      name: "Hoodie",
      basePrice: 1499,
      doubleSideCharge: 300,
      enabled: true,
    },
  } satisfies Record<
    Product,
    {
      name: string;
      basePrice: number;
      doubleSideCharge: number;
      enabled: boolean;
    }
  >,
} as const;