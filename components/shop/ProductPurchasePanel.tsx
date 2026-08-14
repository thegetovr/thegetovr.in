"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Product } from "@/types/product";
import QuantitySelector from "./QuantitySelector";
import ReviewSummary from "./ReviewSummary";
import { useCartStore } from "@/stores/cartStore";

interface ProductPurchasePanelProps {
  product: Product;
  reviewSummary: {
    averageRating: number;
    reviewCount: number;
  };
}

export default function ProductPurchasePanel({
  product,
  reviewSummary,
}: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const addReadyMadeItem = useCartStore(
    (state) => state.addReadyMadeItem,
  );

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      return;
    }

    const coverImage =
      product.media.find((media) => media.isCover) ?? product.media[0];

    addReadyMadeItem({
      id: crypto.randomUUID(),
      kind: "ready-made",
      productId: product.id,
      name: product.name,
      image: coverImage?.url ?? "",
      quantity,
      unitPrice: product.price,
      totalPrice: product.price * quantity,
      createdAt: new Date().toISOString(),
    });

    router.push("/cart");
  };

  return (
    <div className="rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-soft) lg:p-8">
      <div className="space-y-6">
        <div className="inline-flex rounded-full border border-(--color-border) bg-(--color-surface-muted) px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-(--color-text-secondary)">
          {product.category}
        </div>

        <p className="text-sm font-medium text-(--color-text-muted)">
          {product.type === "customizable"
            ? "Create your own design"
            : "Ready to wear collection"}
        </p>

        <h1 className="font-(--font-editorial) text-4xl font-normal leading-tight text-(--color-text-primary) sm:text-5xl">
          {product.name}
        </h1>

        <ReviewSummary
          averageRating={reviewSummary.averageRating}
          reviewCount={reviewSummary.reviewCount}
        />

        <div className="rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-muted) p-6">
          <p className="text-4xl font-semibold text-(--color-text-primary)">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <div className="mt-5 flex items-center justify-between gap-4">
            <p
              className={
                product.stock > 0
                  ? "font-medium text-(--color-accent)"
                  : "font-medium text-(--color-error)"
              }
            >
              {product.stock > 0 ? "● In Stock" : "● Out of Stock"}
            </p>

            <p className="text-sm text-(--color-text-muted)">
              SKU: {product.sku}
            </p>
          </div>
        </div>

        <QuantitySelector
          quantity={quantity}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrease={() => setQuantity((q) => q + 1)}
        />

        <div className="rounded-(--radius-md) border border-(--color-border) bg-(--color-surface) p-6">
          <div className="space-y-4">
            {product.type === "customizable" ? (
              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/studio?product=${encodeURIComponent(product.category)}`,
                  )
                }
                className="w-full rounded-sm bg-(--color-text-primary) px-8 py-4 text-lg font-semibold text-(--color-white) transition-colors duration-200 hover:bg-(--color-text-secondary)"
              >
                Customize Now
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full rounded-sm bg-(--color-text-primary) px-8 py-4 text-lg font-semibold text-(--color-white) transition-colors duration-200 hover:bg-(--color-text-secondary) disabled:cursor-not-allowed disabled:opacity-50"
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            )}

            <button
              type="button"
              disabled
              className="w-full rounded-sm border border-(--color-border) bg-transparent px-8 py-4 text-lg font-medium text-(--color-text-primary) transition-colors hover:border-(--color-text-primary) disabled:cursor-not-allowed disabled:opacity-60"
            >
              Quick Buy (Coming Soon)
            </button>
          </div>
        </div>

        <div className="rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-muted) p-6">
          <ul className="space-y-4 text-sm text-(--color-text-secondary)">
            <li className="flex items-center gap-3">
              <span className="text-(--color-accent)">✓</span>
              <span>
                {product.type === "customizable"
                  ? "Custom printed after you approve your design"
                  : "Ready to ship from inventory"}
              </span>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-(--color-accent)">✓</span>
              <span>Easy 7-day returns</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-(--color-accent)">✓</span>
              <span>100% Secure checkout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}