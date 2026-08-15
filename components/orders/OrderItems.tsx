import type { CartItem } from "@/types/cart";
import { PRODUCTS, PRINT_SIDE_LABELS } from "@/lib/product";
import DesignPreviewCanvas from "@/components/admin/orders/DesignPreviewCanvas";

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
                {isReadyMade ? (
                  /* Ready-made: image + details */
                  <div className="flex items-start gap-4">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-black">
                        {item.name}
                      </h3>

                      <p className="mt-3 inline-flex rounded-full border border-gray-200 bg-gray-200 px-3 py-1 text-xs uppercase tracking-wider text-black">
                        Ready to Wear
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Custom: no image, start directly */
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {PRODUCTS[item.product].label}
                    </h3>

                    <p className="mt-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {PRINT_SIDE_LABELS[item.printSide]}
                    </p>
                  </div>
                )}

                <div className="text-right">
                  <p className="text-sm text-gray-500">Qty</p>

                  <p className="font-medium text-black">{item.quantity}</p>
                </div>
              </div>

              {/* Custom Design Preview */}
              {!isReadyMade && (
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {item.frontElements.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-500">
                        Front Design
                      </p>

                      <div className="flex justify-center">
                        <div className="w-[320px] max-w-full overflow-hidden rounded-xl">
                          <DesignPreviewCanvas
                            product={item.product}
                            productColor={item.color}
                            view="front"
                            elements={item.frontElements}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {item.backElements.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-500">
                        Back Design
                      </p>

                      <div className="flex justify-center">
                        <div className="w-[320px] max-w-full overflow-hidden rounded-xl">
                          <DesignPreviewCanvas
                            product={item.product}
                            productColor={item.color}
                            view="back"
                            elements={item.backElements}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Price */}
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
