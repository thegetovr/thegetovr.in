"use client";

import { useCartStore } from "@/stores/cartStore";

import CartItemCard from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

import Reveal from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const readyMadeItems = useCartStore((state) => state.readyMadeItems);

  const hasItems = items.length > 0 || readyMadeItems.length > 0;

  return (
    <main className="min-h-screen bg-(--color-page) px-6 py-12 text-(--color-text-primary)">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <Reveal>
          <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>
        </Reveal>

        {!hasItems ? (
          <Reveal delay={0.1}>
            <EmptyCart />
          </Reveal>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Cart Items */}
            <Stagger className="space-y-6" stagger={0.08}>
              {readyMadeItems.map((item) => (
                <StaggerItem key={item.id}>
                  <CartItemCard item={item} />
                </StaggerItem>
              ))}

              {items.map((item) => (
                <StaggerItem key={item.id}>
                  <CartItemCard item={item} />
                </StaggerItem>
              ))}
            </Stagger>

            {/* Cart Summary */}
            <Reveal delay={0.15}>
              <aside>
                <CartSummary items={[...readyMadeItems, ...items]} />
              </aside>
            </Reveal>
          </div>
        )}
      </div>
    </main>
  );
}
