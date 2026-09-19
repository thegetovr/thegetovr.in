"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
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
  const [checkingLogin, setCheckingLogin] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const addReadyMadeItem = useCartStore((state) => state.addReadyMadeItem);

  const handleAddToCart = async () => {
    if (product.stock <= 0 || checkingLogin) {
      return;
    }

    setCheckingLogin(true);

    try {
      // Check whether the user is logged in.
      const response = await fetch("/api/auth/session", {
        method: "GET",
        cache: "no-store",
      });

      const session = await response.json();

      if (!response.ok || !session?.user) {
        const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;

        router.push(redirectUrl);
        return;
      }

      const coverImage =
        product.media.find((media) => media.isCover) ?? product.media[0];

      // Existing cart functionality remains unchanged.
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

      // Existing behavior remains unchanged.
      router.push("/cart");
    } catch (error) {
      console.error("Add to cart login check failed:", error);

      // If session check itself fails, don't add the item.
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    } finally {
      setCheckingLogin(false);
    }
  };

  return (
    <motion.div
      className="rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-soft) lg:p-8"
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="space-y-6">
        <motion.div
          className="inline-flex rounded-full border border-(--color-border) bg-(--color-surface-muted) px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-(--color-text-secondary)"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.12,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {product.category}
        </motion.div>

        <motion.p
          className="text-sm font-medium text-(--color-text-muted)"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.18,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {product.type === "customizable"
            ? "Create your own design"
            : "Ready to wear collection"}
        </motion.p>

        <motion.h1
          className="font-(--font-editorial) text-4xl font-normal leading-tight text-(--color-text-primary) sm:text-5xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.22,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {product.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.28,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ReviewSummary
            averageRating={reviewSummary.averageRating}
            reviewCount={reviewSummary.reviewCount}
          />
        </motion.div>

        <motion.div
          className="rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-muted) p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.34,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            onIncrease={() => setQuantity((q) => q + 1)}
          />
        </motion.div>

        <motion.div
          className="rounded-(--radius-md) border border-(--color-border) bg-(--color-surface) p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.46,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="space-y-4">
            {product.type === "customizable" ? (
              <motion.button
                type="button"
                onClick={() =>
                  router.push(
                    `/studio?product=${encodeURIComponent(product.category)}`,
                  )
                }
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full rounded-sm bg-(--color-text-primary) px-8 py-4 text-lg font-semibold text-(--color-white) transition-colors duration-200 hover:bg-(--color-text-secondary)"
              >
                Customize Now
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0 || checkingLogin}
                whileHover={
                  product.stock > 0 && !checkingLogin
                    ? { scale: 1.01 }
                    : undefined
                }
                whileTap={
                  product.stock > 0 && !checkingLogin
                    ? { scale: 0.98 }
                    : undefined
                }
                transition={{ duration: 0.2 }}
                className="flex w-full items-center justify-center gap-3 rounded-sm bg-(--color-text-primary) px-8 py-4 text-lg font-semibold text-(--color-white) transition-colors duration-200 hover:bg-(--color-text-secondary) disabled:cursor-not-allowed disabled:opacity-50"
              >
                {checkingLogin ? (
                  <>
                    <motion.span
                      className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <span>CHECKING...</span>
                  </>
                ) : product.stock > 0 ? (
                  "Add to Cart"
                ) : (
                  "Out of Stock"
                )}
              </motion.button>
            )}

            <button
              type="button"
              disabled
              className="w-full rounded-sm border border-(--color-border) bg-transparent px-8 py-4 text-lg font-medium text-(--color-text-primary) transition-colors hover:border-(--color-text-primary) disabled:cursor-not-allowed disabled:opacity-60"
            >
              Quick Buy (Coming Soon)
            </button>
          </div>
        </motion.div>

        <motion.div
          className="rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-muted) p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.52,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
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
        </motion.div>
      </div>
    </motion.div>
  );
}
