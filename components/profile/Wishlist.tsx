"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Share2, ChevronDown, Trash2 } from "lucide-react";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  variant?: string;
  price: number;
  originalPrice?: number;
  stock: boolean;
}

const wishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "GETOVR Oversized Hoodie",
    image: "/images/products/hoodie.png",
    variant: "Black / XL",
    price: 1999,
    originalPrice: 2999,
    stock: true,
  },
  {
    id: "2",
    name: "GETOVR Runner Sneakers",
    image: "/images/products/sneakers.png",
    variant: "White / 42",
    price: 2499,
    originalPrice: 3499,
    stock: true,
  },
  {
    id: "3",
    name: "GETOVR Minimal Backpack",
    image: "/images/products/backpack.png",
    variant: "Black",
    price: 1499,
    originalPrice: 1999,
    stock: true,
  },
  {
    id: "4",
    name: "GETOVR Classic Cap",
    image: "/images/products/cap.png",
    variant: "Black",
    price: 999,
    originalPrice: 1299,
    stock: true,
  },
];

export default function Wishlist() {
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
            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#ddd5ca] bg-white px-3 py-2.5 text-xs font-medium text-zinc-800 transition hover:bg-[#fcfaf7] sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Share2 size={16} strokeWidth={1.7} className="shrink-0" />

            <span className="truncate">Share Wishlist</span>
          </button>

          <button
            type="button"
            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-black px-3 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <ShoppingBag size={16} strokeWidth={1.7} className="shrink-0" />

            <span className="truncate">Move All to Cart</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="mt-5 flex min-w-0 items-center justify-between rounded-xl border border-[#ddd5ca] bg-white px-4 py-3.5 sm:mt-6 sm:px-5 sm:py-4 md:px-6">
        <p className="text-sm font-medium text-black">
          {wishlistItems.length} Items
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
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => <WishlistRow key={item.id} item={item} />)
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </motion.section>
  );
}

/* =========================================================
   WISHLIST ROW
========================================================= */

function WishlistRow({ item }: { item: WishlistItem }) {
  const discount =
    item.originalPrice &&
    Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  return (
    <div className="border-b border-[#e8e2da] p-3.5 last:border-b-0 sm:p-4 md:px-5 md:py-4">
      {/* =================================================
          MOBILE
      ================================================= */}

      <div className="block md:hidden">
        {/* PRODUCT */}

        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f8f6f2]">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-black">
              {item.name}
            </h2>

            {item.variant && (
              <p className="mt-1 truncate text-xs text-zinc-500">
                {item.variant}
              </p>
            )}

            <p
              className={`mt-2 text-xs font-medium ${
                item.stock ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.stock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          {/* REMOVE */}

          <button
            type="button"
            aria-label={`Remove ${item.name} from wishlist`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={17} strokeWidth={1.8} />
          </button>
        </div>

        {/* PRICE + ACTION */}

        <div className="mt-4 flex min-w-0 items-center justify-between gap-3 border-t border-[#eee9e2] pt-3.5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-semibold text-black">
                ₹{item.price.toLocaleString("en-IN")}
              </span>

              {item.originalPrice && (
                <>
                  <span className="text-xs text-zinc-400 line-through">
                    ₹{item.originalPrice.toLocaleString("en-IN")}
                  </span>

                  <span className="text-xs font-medium text-red-500">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={!item.stock}
            className="inline-flex min-w-0 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#eee3d5] px-3 py-2.5 text-xs font-medium text-zinc-900 transition hover:bg-[#e6d8c6] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <ShoppingBag size={15} strokeWidth={1.8} />

            <span>{item.stock ? "Add to Cart" : "Out of Stock"}</span>
          </button>
        </div>
      </div>

      {/* =================================================
          DESKTOP
      ================================================= */}

      <div className="hidden md:grid md:grid-cols-[92px_minmax(0,1fr)_145px_130px] md:items-center md:gap-4">
        {/* IMAGE */}

        <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-lg bg-[#f8f6f2]">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain transition duration-300 hover:scale-105"
          />
        </div>

        {/* INFO */}

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-black">
            {item.name}
          </h2>

          {item.variant && (
            <p className="mt-1 text-xs text-zinc-500">{item.variant}</p>
          )}

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
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-semibold text-black">
              ₹{item.price.toLocaleString("en-IN")}
            </span>

            {item.originalPrice && (
              <span className="text-xs text-zinc-400 line-through">
                ₹{item.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {item.originalPrice && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {discount}% OFF
            </p>
          )}
        </div>

        {/* ACTIONS */}

        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            aria-label={`Remove ${item.name} from wishlist`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 transition hover:text-red-600"
          >
            <Trash2 size={15} strokeWidth={1.8} />
            Remove
          </button>

          <button
            type="button"
            disabled={!item.stock}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#eee3d5] px-3 py-2 text-xs font-medium text-zinc-900 transition hover:bg-[#e6d8c6] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <ShoppingBag size={15} strokeWidth={1.8} />

            {item.stock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY WISHLIST
========================================================= */

function EmptyWishlist() {
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
        className="mt-5 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Start Shopping
      </button>
    </div>
  );
}
