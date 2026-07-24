"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useCheckoutStore } from "@/stores/checkoutStore";
export default function OrderSummary() {
    const items = useCartStore((state) => state.items);
    const { isValid, isSubmitting } = useCheckoutStore();
    const subtotal = items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
    );

    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <Card
            as={undefined}
            className="sticky top-6 h-fit bg-[#1B1B22]"
        >
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