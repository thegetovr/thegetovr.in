"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

let wishlistPromise: Promise<Set<string>> | null = null;
let wishlistIds = new Set<string>();

async function loadWishlist() {
  if (!wishlistPromise) {
    wishlistPromise = fetch("/api/wishlist", {
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) return new Set<string>();

        const data = await response.json();

        const ids = new Set<string>(
          (data.productIds ?? []).map((id: unknown) => String(id)),
        );

        wishlistIds = ids;
        return ids;
      })
      .catch(() => new Set<string>());
  }

  return wishlistPromise;
}

type Props = {
  productId: string;
  size?: "sm" | "md";
};

export default function WishlistButton({
  productId,
  size = "md",
}: Props) {
  const [isWishlisted, setIsWishlisted] = useState(
    wishlistIds.has(productId),
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadWishlist().then((ids) => {
      if (mounted) {
        setIsWishlisted(ids.has(productId));
      }
    });

    return () => {
      mounted = false;
    };
  }, [productId]);

  async function toggleWishlist() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/wishlist", {
        method: isWishlisted ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });

      if (response.status === 401) {
        window.location.href = `/login?redirect=${encodeURIComponent(
          window.location.pathname,
        )}`;
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) return;

      const nextIds = new Set<string>(
        (data.productIds ?? []).map((id: unknown) => String(id)),
      );

      wishlistIds = nextIds;
      wishlistPromise = Promise.resolve(nextIds);
      setIsWishlisted(nextIds.has(productId));
    } catch (error) {
      console.error("WISHLIST TOGGLE ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const dimensions = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const iconSize = size === "sm" ? 14 : 15;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void toggleWishlist();
      }}
      disabled={isLoading}
      aria-label={
        isWishlisted ? "Remove from wishlist" : "Add to wishlist"
      }
      aria-pressed={isWishlisted}
      className={`${dimensions} flex shrink-0 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 disabled:cursor-wait disabled:opacity-60 ${
        isWishlisted
          ? "border-(--color-text-primary) bg-(--color-text-primary) text-white"
          : "border-black/[0.08] bg-white/85 text-(--color-text-primary) hover:bg-white"
      }`}
    >
      <Heart
        size={iconSize}
        strokeWidth={1.35}
        fill={isWishlisted ? "currentColor" : "none"}
      />
    </button>
  );
}
