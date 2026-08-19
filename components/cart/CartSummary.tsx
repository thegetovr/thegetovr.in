import Link from "next/link";
import type { CartItem } from "@/types/cart";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="sticky top-6 rounded-md border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-soft)">
      <h2 className="text-2xl font-semibold text-(--color-text-primary)">
        Order Summary
      </h2>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between text-(--color-text-secondary)">
          <span>Items ({items.length})</span>

          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between text-(--color-text-secondary)">
          <span>Shipping</span>

          <span className="text-(--color-accent)">FREE</span>
        </div>
      </div>

      <div className="my-6 border-t border-(--color-border)" />

      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-(--color-text-primary)">
          Total
        </span>

        <span className="text-3xl font-bold text-(--color-text-primary)">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-8 flex w-full items-center justify-center rounded-sm bg-(--color-text-primary) py-3 font-semibold text-(--color-white) transition-colors hover:bg-(--color-text-secondary)"
      >
        Proceed to Checkout
      </Link>

      <Link
        href="/shop"
        className="mt-4 block text-center text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
