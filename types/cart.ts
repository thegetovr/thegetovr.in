import type {
  DesignElement,
  PrintSide,
  Product,
  ProductColor,
  ProductSize,
} from "./design";

export interface CartItem {
  id: string;

  product: Product;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
  printSide: PrintSide;

  frontElements: DesignElement[];
  backElements: DesignElement[];

  unitPrice: number;
  totalPrice: number;

  createdAt: string;
}