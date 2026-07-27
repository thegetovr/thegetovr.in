"use client";

import { useState } from "react";

import DesignCanvas from "@/components/studio/canvas/DesignCanvas";
import StudioSidebar from "@/components/studio/StudioSidebar";
import type { Product, DesignElement } from "@/types/design";

export default function StudioPage() {
  const [product, setProduct] = useState<Product>("hoodie");

  const [elements, setElements] = useState<DesignElement[]>([]);

  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );

  return (
    <main className="min-h-screen bg-[#0b0b0d] pt-24 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-[1700px] gap-5 px-5 pb-5">
        {/* Sidebar */}
        <aside className="w-[300px] shrink-0 rounded-3xl border border-white/10 bg-[#151519] p-5">
          <StudioSidebar
            product={product}
            setProduct={setProduct}
            elements={elements}
            setElements={setElements}
            selectedElementId={selectedElementId}
            setSelectedElementId={setSelectedElementId}
          />
        </aside>

        {/* Studio */}
        <section className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#151519]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Design Studio
              </h1>

              <p className="mt-1 text-gray-400">
                Create your own premium apparel
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold tracking-wide">
              🧥 {product.toUpperCase()}
            </div>
          </div>

          {/* Workspace */}
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#e9e9e9] p-6">
            <DesignCanvas
              product={product}
              elements={elements}
              setElements={setElements}
              selectedElementId={selectedElementId}
              setSelectedElementId={setSelectedElementId}
            />
          </div>

          {/* Toolbar */}
          <div className="flex h-16 items-center justify-center gap-3 border-t border-white/10 bg-[#111114]">
            <button className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10">
              ↶ Undo
            </button>

            <button className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10">
              ↷ Redo
            </button>

            <button className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10">
              Reset
            </button>

            <button className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10">
              ↑ Front
            </button>

            <button className="rounded-xl bg-white/5 px-5 py-2 transition hover:bg-white/10">
              ↓ Back
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
