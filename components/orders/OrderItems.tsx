import type { CartItem } from "@/types/cart";
import { PRODUCTS, PRINT_SIDE_LABELS } from "@/lib/product";
import DesignPreviewCanvas from "@/components/admin/orders/DesignPreviewCanvas";

interface OrderItemsProps {
  items: CartItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <section className="border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-subtle)">
      <h2 className="text-xl font-semibold tracking-tight text-(--color-text-primary)">
        Order Items
      </h2>

      <div className="mt-6 space-y-5">
        {items.map((item) => {
          const isReadyMade = item.kind === "ready-made";

          return (
            <div
              key={item.id}
              className="border border-(--color-border) bg-(--color-surface) p-4 transition hover:bg-(--color-surface-muted)"
            >
              <div className="flex items-start justify-between gap-6">
                {isReadyMade ? (
                  <div className="flex items-start gap-4">
                    <div className="h-24 w-24 shrink-0 overflow-hidden bg-(--color-surface-muted)">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-(--color-text-primary)">
                        {item.name}
                      </h3>

                      <p className="mt-3 inline-flex border border-(--color-border) bg-(--color-surface-muted) px-3 py-1 text-xs uppercase tracking-wider text-(--color-text-primary)">
                        Ready to Wear
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-(--color-text-primary)">
                      {PRODUCTS[item.product].label}
                    </h3>

                    <p className="mt-3 inline-flex bg-(--color-surface-muted) px-3 py-1 text-xs font-medium text-(--color-text-secondary)">
                      {PRINT_SIDE_LABELS[item.printSide]}
                    </p>
                  </div>
                )}

                <div className="text-right">
                  <p className="text-sm text-(--color-text-muted)">Qty</p>

                  <p className="font-medium text-(--color-text-primary)">
                    {item.quantity}
                  </p>
                </div>
              </div>

              {!isReadyMade && (
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {item.frontElements.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-(--color-text-secondary)">
                        Front Design
                      </p>

                      <div className="flex justify-center">
                        <div className="w-[320px] max-w-full overflow-hidden">
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
                      <p className="mb-2 text-sm font-medium text-(--color-text-secondary)">
                        Back Design
                      </p>

                      <div className="flex justify-center">
                        <div className="w-[320px] max-w-full overflow-hidden">
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

              <div className="mt-5 flex items-center justify-between border-t border-(--color-border) pt-5">
                <div>
                  <p className="text-sm text-(--color-text-muted)">
                    Unit Price
                  </p>

                  <p className="font-medium text-(--color-text-primary)">
                    ₹{item.unitPrice.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-(--color-text-muted)">Total</p>

                  <p className="text-lg font-semibold text-(--color-text-primary)">
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