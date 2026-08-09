"use client";

import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import type { CartItem } from "@/types/cart";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({
  item,
}: CartItemCardProps) {
  const removeItem = useCartStore((state) => state.removeItem);
  const removeReadyMadeItem = useCartStore(
    (state) => state.removeReadyMadeItem,
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  );

  const handleRemove = () => {
    if (item.kind === "ready-made") {
      removeReadyMadeItem(item.id);
      return;
    }

    removeItem(item.id);
  };

  const productName =
    item.kind === "ready-made"
      ? item.name
      : item.product.charAt(0).toUpperCase() +
        item.product.slice(1);

  const printLabel =
    item.kind === "custom"
      ? item.printSide === "both"
        ? "Front + Back"
        : item.printSide === "front"
          ? "Front"
          : "Back"
      : null;

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          {item.kind === "ready-made" && item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={96}
              className="h-24 w-20 rounded-xl object-cover"
            />
          ) : null}

          <div>
            <h2 className="text-xl font-bold">
              {productName}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {item.kind === "ready-made"
                ? "Ready-made Apparel"
                : "Customized Apparel"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-400">
            Unit Price
          </p>

          <p className="text-2xl font-bold">
            ₹{item.unitPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {item.kind === "custom" ? (
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Color
            </p>

            <p className="mt-1 font-medium capitalize">
              {item.color}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Size
            </p>

            <p className="mt-1 font-medium uppercase">
              {item.size}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Print
            </p>

            <p className="mt-1 font-medium">
              {printLabel}
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Quantity
          </p>

          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 transition hover:bg-white/10"
            >
              −
            </button>

            <span className="w-8 text-center font-semibold">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 transition hover:bg-white/10"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-400">Total</p>

          <p className="text-3xl font-bold">
            ₹{item.totalPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
        <div>
          {item.kind === "custom" ? (
            <button
              type="button"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm transition hover:border-white hover:bg-white/10"
            >
              Edit Design
            </button>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleRemove}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium transition hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}