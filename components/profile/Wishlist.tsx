"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Share2, ChevronDown, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/stores/cartStore";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: boolean;
}

export default function Wishlist() {
  const router = useRouter();

  const addReadyMadeItem = useCartStore((state) => state.addReadyMadeItem);

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [movingAll, setMovingAll] = useState(false);

  const loadWishlist = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/wishlist", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load wishlist");
      }

      setWishlistItems(data.items ?? []);
    } catch (error) {
      console.error("LOAD WISHLIST ERROR:", error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  /* =====================================================
     REMOVE FROM WISHLIST
  ===================================================== */

  const removeFromWishlist = async (productId: string) => {
    try {
      setRemovingId(productId);

      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to remove product");
      }

      setWishlistItems((current) =>
        current.filter((item) => item.id !== productId),
      );
    } catch (error) {
      console.error("REMOVE WISHLIST ERROR:", error);
    } finally {
      setRemovingId(null);
    }
  };

  /* =====================================================
     ADD SINGLE ITEM TO CART
     No redirect
  ===================================================== */

  const handleAddToCart = (item: WishlistItem) => {
    if (!item.stock || addingId) {
      return;
    }

    try {
      setAddingId(item.id);

      addReadyMadeItem({
        id: crypto.randomUUID(),
        kind: "ready-made",
        productId: item.id,
        name: item.name,
        image: item.image,
        quantity: 1,
        unitPrice: item.price,
        totalPrice: item.price,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("ADD WISHLIST ITEM TO CART ERROR:", error);
    } finally {
      setAddingId(null);
    }
  };

  /* =====================================================
     MOVE ALL TO CART
     No redirect
  ===================================================== */

  const handleMoveAllToCart = () => {
    if (wishlistItems.length === 0 || movingAll) {
      return;
    }

    const availableItems = wishlistItems.filter((item) => item.stock);

    if (availableItems.length === 0) {
      return;
    }

    try {
      setMovingAll(true);

      availableItems.forEach((item) => {
        addReadyMadeItem({
          id: crypto.randomUUID(),
          kind: "ready-made",
          productId: item.id,
          name: item.name,
          image: item.image,
          quantity: 1,
          unitPrice: item.price,
          totalPrice: item.price,
          createdAt: new Date().toISOString(),
        });
      });
    } catch (error) {
      console.error("MOVE ALL TO CART ERROR:", error);
    } finally {
      setMovingAll(false);
    }
  };

  /* =====================================================
     SHARE WISHLIST
  ===================================================== */

  const shareWishlist = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Getovr Wishlist",
          text: "Check out my wishlist on The Getovr.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // User cancelled sharing.
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-w-0 flex-1 overflow-hidden rounded-xl border border-[#e6e0d8] bg-white p-4 sm:p-5 md:p-7"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-serif text-2xl tracking-tight text-black">
            My Wishlist
          </h1>

          <div className="mt-2 h-[2px] w-8 bg-[#b7965d]" />

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Your saved products you love
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-3">
          <button
            type="button"
            onClick={shareWishlist}
            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#ddd5ca] bg-white px-3 py-2.5 text-xs font-medium text-zinc-800 transition hover:bg-[#fcfaf7] sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Share2 size={16} strokeWidth={1.7} className="shrink-0" />

            <span className="truncate">Share Wishlist</span>
          </button>

          <button
            type="button"
            onClick={handleMoveAllToCart}
            disabled={
              wishlistItems.length === 0 ||
              movingAll ||
              !wishlistItems.some((item) => item.stock)
            }
            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-black px-3 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <ShoppingBag size={16} strokeWidth={1.7} className="shrink-0" />

            <span className="truncate">
              {movingAll ? "Moving..." : "Move All to Cart"}
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="mt-5 flex min-w-0 items-center justify-between rounded-xl border border-[#ddd5ca] bg-white px-4 py-3.5 sm:mt-6 sm:px-5 sm:py-4 md:px-6">
        <p className="text-sm font-medium text-black">
          {loading ? "Loading..." : `${wishlistItems.length} Items`}
        </p>

        <button
          type="button"
          className="flex items-center gap-2 text-xs text-zinc-600 sm:text-sm"
        >
          <span className="hidden xs:inline">Sort By:</span>

          <span className="inline-flex items-center gap-2 rounded-lg border border-[#ddd5ca] px-3 py-2 text-black sm:px-4">
            Latest
            <ChevronDown size={15} strokeWidth={1.7} />
          </span>
        </button>
      </div>

      {/* =====================================================
          WISHLIST LIST
      ===================================================== */}

      <div className="mt-5 min-w-0 overflow-hidden rounded-xl border border-[#ddd5ca] bg-white">
        {loading ? (
          <WishlistLoading />
        ) : wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <WishlistRow
              key={item.id}
              item={item}
              removing={removingId === item.id}
              adding={addingId === item.id}
              onRemove={removeFromWishlist}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <EmptyWishlist onStartShopping={() => router.push("/shop")} />
        )}
      </div>
    </motion.section>
  );
}

/* =========================================================
   WISHLIST ROW
========================================================= */

function WishlistRow({
  item,
  removing,
  adding,
  onRemove,
  onAddToCart,
}: {
  item: WishlistItem;
  removing: boolean;
  adding: boolean;
  onRemove: (productId: string) => void;
  onAddToCart: (item: WishlistItem) => void;
}) {
  return (
    <div className="border-b border-[#e8e2da] p-3.5 last:border-b-0 sm:p-4 md:px-5 md:py-4">
      {/* =================================================
          MOBILE
      ================================================= */}

      <div className="block md:hidden">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f8f6f2]">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-[9px] uppercase tracking-wider text-zinc-400">
                No Image
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-black">
              {item.name}
            </h2>

            <p
              className={`mt-2 text-xs font-medium ${
                item.stock ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.stock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            disabled={removing}
            aria-label={`Remove ${item.name} from wishlist`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={17} strokeWidth={1.8} />
          </button>
        </div>

        {/* PRICE + ACTION */}

        <div className="mt-4 flex min-w-0 items-center justify-between gap-3 border-t border-[#eee9e2] pt-3.5">
          <div className="min-w-0">
            <span className="text-sm font-semibold text-black">
              ₹{item.price.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(item)}
            disabled={!item.stock || adding}
            className="inline-flex min-w-0 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#eee3d5] px-3 py-2.5 text-xs font-medium text-zinc-900 transition hover:bg-[#e6d8c6] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <ShoppingBag size={15} strokeWidth={1.8} />

            <span>
              {adding
                ? "Adding..."
                : item.stock
                  ? "Add to Cart"
                  : "Out of Stock"}
            </span>
          </button>
        </div>
      </div>

      {/* =================================================
          DESKTOP
      ================================================= */}

      <div className="hidden md:grid md:grid-cols-[92px_minmax(0,1fr)_145px_130px] md:items-center md:gap-4">
        {/* IMAGE */}

        <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-lg bg-[#f8f6f2]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-contain transition duration-300 hover:scale-105"
            />
          ) : (
            <span className="text-[9px] uppercase tracking-wider text-zinc-400">
              No Image
            </span>
          )}
        </div>

        {/* INFO */}

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-black">
            {item.name}
          </h2>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`text-xs font-medium ${
                item.stock ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.stock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        {/* PRICE */}

        <div>
          <span className="text-sm font-semibold text-black">
            ₹{item.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* ACTIONS */}

        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            disabled={removing}
            aria-label={`Remove ${item.name} from wishlist`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={15} strokeWidth={1.8} />

            {removing ? "Removing..." : "Remove"}
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(item)}
            disabled={!item.stock || adding}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#eee3d5] px-3 py-2 text-xs font-medium text-zinc-900 transition hover:bg-[#e6d8c6] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <ShoppingBag size={15} strokeWidth={1.8} />

            {adding ? "Adding..." : item.stock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function WishlistLoading() {
  return (
    <div className="divide-y divide-[#e8e2da]">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center gap-4 p-4 md:px-5 md:py-5">
          <div className="h-[88px] w-[88px] shrink-0 animate-pulse rounded-lg bg-[#f3f0eb]" />

          <div className="flex-1 space-y-3">
            <div className="h-4 w-2/5 animate-pulse rounded bg-[#f3f0eb]" />
            <div className="h-3 w-1/4 animate-pulse rounded bg-[#f3f0eb]" />
          </div>

          <div className="hidden h-4 w-20 animate-pulse rounded bg-[#f3f0eb] md:block" />
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   EMPTY WISHLIST
========================================================= */

function EmptyWishlist({ onStartShopping }: { onStartShopping: () => void }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center sm:min-h-[360px]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f1eb]">
        <Heart size={28} strokeWidth={1.4} className="text-zinc-400" />
      </div>

      <h2 className="mt-4 text-base font-semibold text-black">
        Your Wishlist is Empty
      </h2>

      <p className="mt-1 max-w-sm text-sm leading-5 text-zinc-500">
        Save products you love and come back to them anytime.
      </p>

      <button
        type="button"
        onClick={onStartShopping}
        className="mt-5 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Start Shopping
      </button>
    </div>
  );
}
