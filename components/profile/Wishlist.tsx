"use client";

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
    <section className="min-w-0 flex-1 bg-white px-8 py-7">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black">
            My Wishlist
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Your saved products you love
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
          >
            <Share2 size={17} strokeWidth={1.8} />
            Share Wishlist
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <ShoppingBag size={17} strokeWidth={1.8} />
            Move All to Cart
          </button>
        </div>
      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="mt-7 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4">
        <p className="text-sm font-medium text-black">
          {wishlistItems.length} Items
        </p>

        <button
          type="button"
          className="flex items-center gap-3 text-sm text-gray-600"
        >
          Sort By:
          <span className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-black">
            Latest
            <ChevronDown size={16} />
          </span>
        </button>
      </div>

      {/* =====================================================
          PRODUCT GRID
      ===================================================== */}

      <div className="mt-5 grid grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </div>

      {/* =====================================================
          EMPTY WISHLIST
      ===================================================== */}

      {wishlistItems.length === 0 && (
        <div className="mt-5 flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
            <Heart size={38} strokeWidth={1.5} className="text-gray-500" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-black">
            Your Wishlist is Empty
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Save products you love and come back to them anytime.
          </p>

          <button
            type="button"
            className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Start Shopping
          </button>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   WISHLIST CARD
========================================================= */

function WishlistCard({ item }: { item: WishlistItem }) {
  const discount =
    item.originalPrice &&
    Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300">
      {/* Product Image */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />

        {/* Remove Wishlist */}
        <button
          type="button"
          aria-label={`Remove ${item.name} from wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-red-50"
        >
          <Trash2 size={17} strokeWidth={1.8} className="text-red-500" />
        </button>
      </div>

      {/* Product Information */}
      <div className="px-1 pt-4">
        <h3 className="truncate text-sm font-semibold text-black">
          {item.name}
        </h3>

        {item.variant && (
          <p className="mt-1 text-xs text-gray-500">{item.variant}</p>
        )}

        {/* Price */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-base font-semibold text-black">
            ₹{item.price.toLocaleString("en-IN")}
          </span>

          {item.originalPrice && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ₹{item.originalPrice.toLocaleString("en-IN")}
              </span>

              <span className="text-xs font-medium text-red-500">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Stock */}
        <p
          className={`mt-3 text-xs font-medium ${
            item.stock ? "text-green-600" : "text-red-500"
          }`}
        >
          {item.stock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Add To Cart */}
        <button
          type="button"
          disabled={!item.stock}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
        >
          <ShoppingBag size={16} strokeWidth={1.8} />

          {item.stock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
