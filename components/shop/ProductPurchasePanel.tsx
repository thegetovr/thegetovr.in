"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@/types/product";
import QuantitySelector from "./QuantitySelector";

interface ProductPurchasePanelProps {
  product: Product;
}

export default function ProductPurchasePanel({
  product,
}: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  return (
    <div className="rounded-[32px] border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-8 shadow-2xl">
      <div className="space-y-6">
        <div className="inline-flex rounded-full border border-zinc-700 bg-zinc-800/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300">
          {product.category}
        </div>
        <p className="text-sm font-medium text-zinc-500">
          {product.type === "customizable"
            ? "Create your own design"
            : "Ready to wear collection"}
        </p>

        <h1 className="text-5xl font-black tracking-tight">{product.name}</h1>

        <div className="rounded-2xl border border-zinc-800 bg-black/40 p-6">
          <p className="text-5xl font-black text-white">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <p
              className={
                product.stock > 0
                  ? "font-semibold text-green-500"
                  : "font-semibold text-red-500"
              }
            >
              {product.stock > 0 ? "● In Stock" : "● Out of Stock"}
            </p>

            <p className="text-sm text-zinc-500">SKU: {product.sku}</p>
          </div>
        </div>

        <QuantitySelector
          quantity={quantity}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrease={() => setQuantity((q) => q + 1)}
        />

        <div className="rounded-2xl border border-zinc-800 bg-black/40 p-6">
          <div className="space-y-4">
            {product.type === "customizable" ? (
              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/studio?product=${encodeURIComponent(product.category)}`,
                  )
                }
                className="w-full rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl"
              >
                Customize Now
              </button>
            ) : (
              <button
                type="button"
                className="w-full rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl"
              >
                Add to Cart
              </button>
            )}

            <button className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-white">
              Quick Buy (Coming Soon)
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 to-black/70 p-6">
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span>
                {product.type === "customizable"
                  ? "Custom printed after you approve your design"
                  : "Ready to ship from inventory"}
              </span>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span>Easy 7-day returns</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span>100% Secure checkout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
