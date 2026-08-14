"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { createOrder } from "@/lib/generateOrder";
import type { CheckoutFormData } from "@/lib/validation/checkoutSchema";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

function getProductName(product: "hoodie" | "oversized" | "tshirt") {
  const names = {
    hoodie: "Hoodie",
    oversized: "Oversized T-Shirt",
    tshirt: "Classic T-Shirt",
  };

  return names[product];
}

export default function OrderSummary() {
  const { items, readyMadeItems, clearCart } = useCartStore();
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

  const allItems = [...items, ...readyMadeItems];

  const subtotal = allItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const shipping = 0;
  const total = subtotal + shipping;
  const finalTotal = total - discount;

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    try {
      const order = createOrder(customer, allItems, subtotal, discount, coupon);

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

        router.replace(
          `/order-success?orderNumber=${encodeURIComponent(order.orderNumber)}`,
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="sticky top-6 h-fit">
      <h2 className="text-2xl font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-5">
        {allItems.length === 0 ? (
          <p className="text-sm text-(--color-text-muted)">
            Your cart is empty.
          </p>
        ) : (
          allItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-semibold">
                    {item.kind === "custom"
                      ? getProductName(item.product)
                      : item.name}
                  </h3>

                  {item.kind === "custom" ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-(--color-surface-muted) px-3 py-1 text-xs text-(--color-text-secondary)">
                        {item.color}
                      </span>

                      <span className="rounded-full bg-(--color-surface-muted) px-3 py-1 text-xs text-(--color-text-secondary)">
                        Size {item.size}
                      </span>

                      <span className="rounded-full bg-(--color-surface-muted) px-3 py-1 text-xs text-(--color-text-secondary)">
                        {item.printSide}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-(--color-text-muted)">
                      Ready-made apparel
                    </p>
                  )}

                  <p className="mt-3 text-sm text-(--color-text-muted)">
                    Quantity:{" "}
                    <span className="font-medium text-(--color-text-primary)">
                      {item.quantity}
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">
                    ₹{item.totalPrice.toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-sm text-(--color-text-muted)">
                    ₹{item.unitPrice.toLocaleString("en-IN")} each
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
          onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
          className="flex-1 rounded-lg border border-(--color-input-border) bg-(--color-input-background) px-4 py-3 text-(--color-text-primary) outline-none"
        />

        <Button
          loading={couponLoading}
          disabled={!couponCode.trim() || allItems.length === 0}
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
        <p className="mt-2 text-center text-sm text-(--color-accent)">
          {couponMessage}
        </p>
      )}

      <div className="my-6 border-t border-(--color-border)" />

      <div className="space-y-3">
        <div className="flex justify-between text-(--color-text-secondary)">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between text-(--color-text-secondary)">
          <span>Shipping</span>
          <span className="text-(--color-success)">FREE</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-(--color-success)">
            <span>Coupon ({coupon})</span>

            <div className="flex items-center gap-3">
              <span>-₹{discount.toLocaleString("en-IN")}</span>

              <button
                type="button"
                onClick={() => {
                  removeCoupon();
                  setCouponCode("");
                  setCouponMessage("");
                }}
                className="text-sm text-(--color-error) transition-colors hover:opacity-80"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="border-t border-(--color-border) pt-4">
          <div className="flex justify-between text-xl font-semibold">
            <span>Total</span>
            <span>₹{finalTotal.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-(--color-border) bg-(--color-surface-muted) p-4">
        <div className="flex items-center justify-between text-sm text-(--color-text-secondary)">
          <span>Items</span>
          <span>{allItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm text-(--color-text-secondary)">
          <span>Estimated Delivery</span>
          <span>3–5 Days</span>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-(--color-border) bg-(--color-surface-muted) p-4 text-sm text-(--color-text-secondary)">
        <p>🔒 Secure SSL Checkout</p>
        <p>🚚 Free Shipping</p>
        <p>↩️ Easy Returns</p>
      </div>

      <Button
        className="mt-8"
        fullWidth
        loading={isSubmitting}
        disabled={!isValid || allItems.length === 0}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>

      <Link
        href="/cart"
        className="mt-4 block text-center text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"
      >
        Back to Cart
      </Link>
    </Card>
  );
}
