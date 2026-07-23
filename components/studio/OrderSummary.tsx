import { calculatePrice } from "@/lib/store/pricing";
import { STORE_CONFIG } from "@/lib/config/store";
import type {
  PrintSide,
  Product,
  ProductQuantity,
  ProductSize,
} from "@/types/design";

interface OrderSummaryProps {
  product: Product;
  size: ProductSize;
  quantity: ProductQuantity;
  printSide: PrintSide;
}

export default function OrderSummary({
  product,
  size,
  quantity,
  printSide,
}: OrderSummaryProps) {
  const { currency, unitPrice, totalPrice } = calculatePrice(
    product,
    printSide,
    quantity
  );

  const productInfo = STORE_CONFIG.products[product];

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#232329] p-5">
      <h3 className="mb-4 text-lg font-semibold">
        Order Summary
      </h3>

      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Product</span>
          <span>{productInfo.name}</span>
        </div>

        <div className="flex justify-between">
          <span>Size</span>
          <span>{size}</span>
        </div>

        <div className="flex justify-between">
          <span>Print</span>
          <span>
            {printSide === "front"
              ? "Front Only"
              : printSide === "back"
              ? "Back Only"
              : "Front + Back"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Quantity</span>
          <span>{quantity}</span>
        </div>

        <hr className="border-white/10" />

        <div className="flex justify-between">
          <span>Unit Price</span>
          <span>
            {currency} {unitPrice}
          </span>
        </div>

        <div className="flex justify-between text-base font-semibold text-white">
          <span>Total</span>
          <span>
            {currency} {totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}