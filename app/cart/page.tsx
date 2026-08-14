"use client";

import { useCartStore } from "@/stores/cartStore";

import CartItemCard from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const readyMadeItems = useCartStore(
    (state) => state.readyMadeItems,
  );

  const hasItems =
    items.length > 0 || readyMadeItems.length > 0;

  return (
    <main className="min-h-screen bg-(--color-page) px-6 py-12 text-(--color-text-primary)">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold">
          Shopping Cart
        </h1>

        {!hasItems ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <section className="space-y-6">
              {readyMadeItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                />
              ))}

              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                />
              ))}
            </section>

            <aside>
              <CartSummary
                items={[
                  ...readyMadeItems,
                  ...items,
                ]}
              />
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}