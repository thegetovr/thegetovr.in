import Link from "next/link";
import type { CartItem } from "@/types/cart";

interface CartSummaryProps {
    items: CartItem[];
}

export default function CartSummary({
    items,
}: CartSummaryProps) {
    const subtotal = items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
    );

    const shipping = 0;

    const total = subtotal + shipping;

    return (
        <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#1B1B22] p-6 shadow-lg">

            <h2 className="text-2xl font-semibold">
                Order Summary
            </h2>

            <div className="mt-8 space-y-4">

                <div className="flex justify-between text-gray-300">
                    <span>
                        Items ({items.length})
                    </span>

                    <span>
                        ₹{subtotal}
                    </span>
                </div>

                <div className="flex justify-between text-gray-300">
                    <span>
                        Shipping
                    </span>

                    <span className="text-green-400">
                        FREE
                    </span>
                </div>

            </div>

            <div className="my-6 border-t border-white/10" />

            <div className="flex items-center justify-between">

                <span className="text-lg font-medium">
                    Total
                </span>

                <span className="text-3xl font-bold">
                    ₹{total}
                </span>

            </div>

            <Link
                href="/checkout"
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-gray-200"
            >
                Proceed to Checkout
            </Link>

            <Link
                href="/shop"
                className="mt-4 block text-center text-sm text-gray-400 transition hover:text-white"
            >
                Continue Shopping
            </Link>

        </div>
    );
}