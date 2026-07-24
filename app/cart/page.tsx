"use client";

import { useCartStore } from "@/stores/cartStore";

import CartItemCard from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  return (
    <main className="min-h-screen bg-[#141418] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="mb-8 text-4xl font-bold">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

            <section className="space-y-6">

              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                />
              ))}

            </section>

            <aside>

              <CartSummary items={items} />

            </aside>

          </div>
        )}

      </div>
    </main>
  );
}