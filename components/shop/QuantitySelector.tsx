"use client";

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <div className="rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-muted) p-6">
      <p className="mb-4 text-sm font-medium uppercase tracking-wider text-(--color-text-muted)">
        Quantity
      </p>

      <div className="inline-flex items-center overflow-hidden rounded-(--radius-sm) border border-(--color-border) bg-(--color-surface)">
        <button
          type="button"
          onClick={onDecrease}
          className="px-5 py-3 text-(--color-text-primary) transition-colors hover:bg-(--color-surface-muted) disabled:cursor-not-allowed disabled:opacity-50"
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>

        <div className="min-w-16 border-x border-(--color-border) px-6 py-3 text-center font-semibold text-(--color-text-primary)">
          {quantity}
        </div>

        <button
          type="button"
          onClick={onIncrease}
          className="px-5 py-3 text-(--color-text-primary) transition-colors hover:bg-(--color-surface-muted)"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}