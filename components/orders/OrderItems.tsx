import type { CartItem } from "@/types/cart";
import {
  PRODUCTS,
  COLOR_LABELS,
  PRINT_SIDE_LABELS,
} from "@/lib/product";

interface OrderItemsProps {
  items: CartItem[];
}

export default function OrderItems({
  items,
}: OrderItemsProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Order Items
      </h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">
                  {PRODUCTS[item.product].label}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {COLOR_LABELS[item.color]} • {item.size}
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  {PRINT_SIDE_LABELS[item.printSide]}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-zinc-400">
                  Qty
                </p>

                <p className="font-medium text-white">
                  {item.quantity}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-400">
                  Front Design
                </p>

                <p className="text-white">
                  {item.frontElements.length} element
                  {item.frontElements.length !== 1 && "s"}
                </p>
              </div>

              <div>
                <p className="text-zinc-400">
                  Back Design
                </p>

                <p className="text-white">
                  {item.backElements.length} element
                  {item.backElements.length !== 1 && "s"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
              <div>
                <p className="text-sm text-zinc-400">
                  Unit Price
                </p>

                <p className="font-medium text-white">
                  ${item.unitPrice.toFixed(2)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-zinc-400">
                  Total
                </p>

                <p className="text-lg font-semibold text-white">
                  ${item.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}