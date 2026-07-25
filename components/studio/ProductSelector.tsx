"use client";

type Product = "hoodie" | "oversized" | "tshirt";

interface Props {
  selected: Product;
  onSelect: (product: Product) => void;
}

export default function ProductSelector({ selected, onSelect }: Props) {
  const products: Product[] = ["hoodie", "oversized", "tshirt"];

  return (
    <div className="rounded-3xl bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">Choose Product</h2>

      <div className="space-y-4">
        {products.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`w-full rounded-2xl border p-5 text-left text-lg transition ${
              selected === item
                ? "bg-white text-black"
                : "border-zinc-700 hover:border-white"
            }`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
