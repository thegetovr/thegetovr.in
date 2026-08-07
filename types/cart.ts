import type { PrintSide, Product, ProductColor, ProductSize } from "./design";

import type { CartDesignElement } from "./cartDesign";

export interface CartItem {
  id: string;

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
