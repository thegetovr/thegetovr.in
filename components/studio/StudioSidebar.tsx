"use client";

import ProductSelector from "./ProductSelector";

type Product = "hoodie" | "oversized" | "tshirt";

interface Props {
  product: Product;
  setProduct: (product: Product) => void;
}

export default function StudioSidebar({
  product,
  setProduct,
}: Props) {
  return (
    <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <ProductSelector
        selected={product}
        onSelect={setProduct}
      />

      <div className="mt-8 rounded-2xl bg-zinc-800 p-4">
        <h3 className="mb-3 font-semibold">
          Colors
        </h3>

        <div className="flex gap-3">

          <button className="h-8 w-8 rounded-full border-2 border-white bg-black" />

          <button className="h-8 w-8 rounded-full bg-white" />

          <button className="h-8 w-8 rounded-full bg-neutral-400" />

          <button className="h-8 w-8 rounded-full bg-green-800" />

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-zinc-600 p-6 text-center">

        Upload Design

      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-zinc-600 p-6 text-center">

        Add Text

      </div>

    </aside>
  );
}