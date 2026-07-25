"use client";

import Link from "next/link";
import { createOrder } from "@/lib/generateOrder";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { CheckoutFormData } from "@/lib/validation/checkoutSchema";
import { useCartStore } from "@/stores/cartStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useRouter } from "next/navigation";

export default function OrderSummary() {
  const { items, clearCart } = useCartStore();
  const checkout = useCheckoutStore();
  const { reset } = useFormContext<CheckoutFormData>();
  const router = useRouter();

  const {
    customer,
    isValid,
    isSubmitting,
    coupon,
    discount,
    applyCoupon,
    removeCoupon,
    setIsSubmitting,
  } = checkout;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const shipping = 0;
  const total = subtotal + shipping;
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  const finalTotal = total - discount;
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    try {
      const order = createOrder(customer, items, subtotal, discount, coupon);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();
      if (data.success) {
        clearCart();

        const emptyCustomer = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        };

        reset(emptyCustomer);
        checkout.setCustomer(emptyCustomer);
        checkout.clearCustomer();

        setCouponCode("");
        setCouponMessage("");

        console.log(
          "Redirecting to:",
          `/order-success?orderNumber=${encodeURIComponent(order.orderNumber)}`,
        );

        router.replace(
          `/order-success?orderNumber=${encodeURIComponent(order.orderNumber)}`,
        );
      }
      console.log(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card as={undefined} className="sticky top-6 h-fit bg-[#1B1B22]">
      <h2 className="text-2xl font-semibold text-white">Order Summary</h2>

      <div className="mt-6 space-y-5">
        {items.length === 0 ? (
          <p className="text-sm text-gray-400">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-[#111118] p-4"
            >
              <div className="flex items-start justify-between gap-4">
  <div className="min-w-0 flex-1">
    <h3 className="truncate text-lg font-semibold text-white">
      {item.product}
    </h3>

    <div className="mt-3 flex flex-wrap gap-2">
      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
        {item.color}
      </span>

      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
        Size {item.size}
      </span>

      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
        {item.printSide}
      </span>
    </div>

    <p className="mt-3 text-sm text-zinc-400">
      Quantity:{" "}
      <span className="font-medium text-white">
        {item.quantity}
      </span>
    </p>
  </div>

  <div className="text-right">
    <p className="text-lg font-bold text-white">
      ₹{item.totalPrice}
    </p>

    <p className="mt-1 text-sm text-zinc-500">
      ₹{item.unitPrice} each
    </p>
  </div>
</div>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          className="flex-1 rounded-lg border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none"
        />

        <Button
          loading={couponLoading}
          disabled={!couponCode.trim()}
          onClick={async () => {
            setCouponLoading(true);
            try {
              const response = await fetch("/api/coupons/validate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  code: couponCode,
                  subtotal,
                }),
              });

              const data = await response.json();

              if (data.valid) {
                applyCoupon(data.coupon.code, data.discount);
                setCouponMessage("Coupon applied successfully!");
              } else {
                setCouponMessage(data.message);
              }
            } finally {
              setCouponLoading(false);
            }
          }}
        >
          Apply
        </Button>
      </div>
      {couponMessage && (
        <p className="mt-2 text-sm text-center text-green-400">
          {couponMessage}
        </p>
      )}
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
        {discount > 0 && (
          <div className="flex items-center justify-between text-green-400">
            <span>Coupon ({coupon})</span>

            <div className="flex items-center gap-3">
              <span>-₹{discount}</span>

              <button
                onClick={() => {
                  removeCoupon();
                  setCouponCode("");
                  setCouponMessage("");
                }}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between text-xl font-semibold text-white">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>Items</span>
          <span>{items.length}</span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm text-zinc-400">
          <span>Estimated Delivery</span>
          <span>3–5 Days</span>
        </div>
      </div>
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300">
        <p>🔒 Secure SSL Checkout</p>
        <p>🚚 Free Shipping</p>
        <p>↩️ Easy Returns</p>
      </div>
      <Button
        className="mt-8"
        fullWidth
        loading={isSubmitting}
        disabled={!isValid || items.length === 0}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>

      <Link
        href="/cart"
        className="mt-4 block text-center text-sm text-gray-400 transition hover:text-white"
      >
        Back to Cart
      </Link>
    </Card>
  );
}
