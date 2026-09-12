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
    <div className="rounded-md border border-(--color-border) bg-(--color-surface) p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          {item.kind === "ready-made" && item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={96}
              className="h-24 w-20 rounded-md object-cover"
            />
          ) : null}

          <div>
            <h2 className="text-xl font-bold text-(--color-text-primary)">
              {productName}
            </h2>

            <p className="mt-1 text-sm text-(--color-text-muted)">
              {item.kind === "ready-made"
                ? "Ready-made Apparel"
                : "Customized Apparel"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-(--color-text-muted)">
            Unit Price
          </p>

          <p className="text-2xl font-bold text-(--color-text-primary)">
            {"\u20B9"}{item.unitPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {item.kind === "custom" ? (
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-(--color-text-muted)">
              Color
            </p>

            <p className="mt-1 font-medium capitalize text-(--color-text-primary)">
              {item.color}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-(--color-text-muted)">
              Size
            </p>

            <p className="mt-1 font-medium uppercase text-(--color-text-primary)">
              {item.size}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-(--color-text-muted)">
              Print
            </p>

            <p className="mt-1 font-medium text-(--color-text-primary)">
              {printLabel}
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-(--color-text-muted)">
            Quantity
          </p>

          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-(--color-border) text-(--color-text-primary) transition hover:bg-(--color-surface-muted)"
            >
              -
            </button>

            <span className="w-8 text-center font-semibold text-(--color-text-primary)">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-(--color-border) text-(--color-text-primary) transition hover:bg-(--color-surface-muted)"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-(--color-text-muted)">
            Total
          </p>

          <p className="text-3xl font-bold text-(--color-text-primary)">
            {"\u20B9"}{item.totalPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-(--color-border) pt-6">
        <div>
          {item.kind === "custom" ? (
            <button
              type="button"
              className="rounded-sm border border-(--color-border) px-4 py-2 text-sm text-(--color-text-primary) transition hover:border-(--color-text-primary) hover:bg-(--color-surface-muted)"
            >
              Edit Design
            </button>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleRemove}
          className="rounded-sm bg-(--color-error) px-4 py-2 text-sm font-medium text-(--color-white) transition hover:opacity-90"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
