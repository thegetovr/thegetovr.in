import { STORE_CONFIG } from "@/lib/config/store";
import type {
  PrintSide,
  Product,
  ProductQuantity,
} from "@/types/design";

export function calculatePrice(
  product: Product,
  printSide: PrintSide,
  quantity: ProductQuantity
) {
  const productConfig = STORE_CONFIG.products[product];

  const unitPrice =
    productConfig.basePrice +
    (printSide === "both"
      ? productConfig.doubleSideCharge
      : 0);

  return {
    currency: STORE_CONFIG.currency,
    unitPrice,
    totalPrice: unitPrice * quantity,
  };
}