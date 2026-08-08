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
    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-6">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
        Quantity
      </p>

      <div className="inline-flex items-center overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950">
        <button
          type="button"
          onClick={onDecrease}
          className="px-5 py-3 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={quantity <= 1}
        >
          −
        </button>

        <div className="min-w-16 border-x border-zinc-700 px-6 py-3 text-center font-semibold">
          {quantity}
        </div>

        <button
          type="button"
          onClick={onIncrease}
          className="px-5 py-3 transition hover:bg-zinc-800"
        >
          +
        </button>
      </div>
    </div>
  );
}