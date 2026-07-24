"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";

export default function OrderSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <aside className="sticky top-6 h-fit rounded-2xl border border-white/10 bg-[#1B1B22] p-6">
      <h2 className="text-2xl font-semibold text-white">
        Order Summary
      </h2>

      <div className="mt-6 space-y-5">
        {items.length === 0 ? (
          <p className="text-sm text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-[#111118] p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white">
                    {item.product}
                  </h3>

                  <div className="mt-2 space-y-1 text-sm text-gray-400">
                    <p>Color: {item.color}</p>
                    <p>Size: {item.size}</p>
                    <p>Print: {item.printSide}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>

                <span className="font-semibold text-white">
                  ₹{item.totalPrice}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="my-6 border-t border-white/10" />

      <div className="space-y-3">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Shipping</span>
          <span className="text-green-400">FREE</span>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between text-xl font-semibold text-white">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      <button
        className="mt-8 w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-gray-200"
        disabled={items.length === 0}
      >
        Place Order
      </button>

      <Link
        href="/cart"
        className="mt-4 block text-center text-sm text-gray-400 transition hover:text-white"
      >
        Back to Cart
      </Link>
    </aside>
  );
}