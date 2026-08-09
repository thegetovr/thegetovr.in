import type {
  PrintSide,
  Product,
  ProductColor,
  ProductSize,
} from "./design";

import type { CartDesignElement } from "./cartDesign";

export interface ReadyMadeCartItem {
  id: string;
  kind: "ready-made";

  productId: string;
  name: string;
  image: string;

  quantity: number;

  unitPrice: number;
  totalPrice: number;

  createdAt: string;
}

export interface CustomCartItem {
  id: string;
  kind: "custom";

  product: Product;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
  printSide: PrintSide;

  frontElements: CartDesignElement[];
  backElements: CartDesignElement[];

  unitPrice: number;
  totalPrice: number;

  createdAt: string;
}

export type CartItem = ReadyMadeCartItem | CustomCartItem;