import type { CartItem } from "@/types/cart";
import { PRODUCTS, COLOR_LABELS, PRINT_SIDE_LABELS } from "@/lib/product";

interface OrderItemsProps {
  items: CartItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-black">Order Items</h2>

      <div className="mt-6 space-y-5">
        {items.map((item) => {
          const isReadyMade = item.kind === "ready-made";

          return (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-4 transition hover:bg-gray-50"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    {isReadyMade ? item.name : PRODUCTS[item.product].label}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {isReadyMade
                      ? "Ready-Made Apparel"
                      : `${COLOR_LABELS[item.color]} • Size ${item.size}`}
                  </p>

                  {!isReadyMade && (
                    <p className="mt-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
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
                  <p className="text-sm text-gray-500">Qty</p>

                  <p className="font-medium text-black">{item.quantity}</p>
                </div>
              </div>

              {!isReadyMade && (
                <div className="mt-5 grid grid-cols-2 gap-6 rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm">
                  <div>
                    <p className="text-gray-500">Front Design</p>

                    <p className="text-black">
                      {item.frontElements.length} element
                      {item.frontElements.length !== 1 && "s"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Back Design</p>

                    <p className="text-black">
                      {item.backElements.length} element
                      {item.backElements.length !== 1 && "s"}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">
                <div>
                  <p className="text-sm text-gray-500">Unit Price</p>

                  <p className="font-medium text-black">
                    ₹{item.unitPrice.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>

                  <p className="text-lg font-semibold text-black">
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
