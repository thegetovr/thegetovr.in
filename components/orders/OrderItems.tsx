import type { CartItem } from "@/types/cart";
import {
  PRODUCTS,
  COLOR_LABELS,
  PRINT_SIDE_LABELS,
} from "@/lib/product";

interface OrderItemsProps {
  items: CartItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-white">Order Items</h2>

      <div className="mt-6 space-y-5">
        {items.map((item) => {
          const isReadyMade = item.kind === "ready-made";

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-800 bg-black p-6 transition-colors hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {isReadyMade
                      ? item.name
                      : PRODUCTS[item.product].label}
                  </h3>

                  <p className="mt-2 text-sm uppercase tracking-wide text-zinc-400">
                    {isReadyMade
                      ? "Ready-Made Apparel"
                      : `${COLOR_LABELS[item.color]} • Size ${item.size}`}
                  </p>

                  {!isReadyMade && (
                    <p className="mt-3 inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs uppercase tracking-wider text-zinc-300">
                      {PRINT_SIDE_LABELS[item.printSide]}
                    </p>
                  )}

                  {isReadyMade && (
                    <p className="mt-3 inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs uppercase tracking-wider text-zinc-300">
                      Ready to Wear
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm text-zinc-400">Qty</p>

                  <p className="font-medium text-white">{item.quantity}</p>
                </div>
              </div>

              {!isReadyMade && (
                <div className="mt-6 grid grid-cols-2 gap-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm">
                  <div>
                    <p className="text-zinc-400">Front Design</p>

                    <p className="text-white">
                      {item.frontElements.length} element
                      {item.frontElements.length !== 1 && "s"}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400">Back Design</p>

                    <p className="text-white">
                      {item.backElements.length} element
                      {item.backElements.length !== 1 && "s"}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-6">
                <div>
                  <p className="text-sm text-zinc-400">Unit Price</p>

                  <p className="font-medium text-white">
                    ₹{item.unitPrice.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-zinc-400">Total</p>

                  <p className="text-lg font-semibold text-white">
                    ₹{item.totalPrice.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}