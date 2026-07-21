"use client";

import { useState } from "react";

import DesignCanvas from "@/components/studio/canvas/DesignCanvas";
import StudioSidebar from "@/components/studio/StudioSidebar";
import type {
  Product,
  DesignElement,
} from "@/types/design";


export default function StudioPage() {
  const [product, setProduct] =
    useState<Product>("hoodie");

  const [elements, setElements] = useState<DesignElement[]>([]);

  const [selectedElementId, setSelectedElementId] =
    useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#0b0b0d] pt-24 text-white">
      <div className="mx-auto flex h-[calc(100vh-96px)] max-w-[1800px] gap-6 px-6 pb-6">

        {/* LEFT SIDEBAR */}
        <aside className="w-[320px] shrink-0 rounded-2xl border border-white/10 bg-[#141418] p-5">
          <StudioSidebar
            product={product}
            setProduct={setProduct}
            elements={elements}
            setElements={setElements}
            selectedElementId={selectedElementId}
            setSelectedElementId={setSelectedElementId}
          />
        </aside>

        {/* CENTER */}
        <section className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141418]">

          {/* Top Bar */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
            <div>
              <h1 className="text-2xl font-bold">
                Design Studio
              </h1>

              <p className="text-sm text-gray-400">
                Customize your product
              </p>
            </div>

            <div className="rounded-full bg-white/5 px-4 py-2 text-sm">
              {product.toUpperCase()}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex flex-1 items-center justify-center bg-[#ececec] p-8">
            <DesignCanvas
              product={product}
              elements={elements}
              setElements={setElements}
              selectedElementId={selectedElementId}
              setSelectedElementId={setSelectedElementId}
            />
          </div>

          {/* Bottom Toolbar */}
          <div className="flex h-16 items-center justify-center gap-4 border-t border-white/10">

            <button className="rounded-lg bg-white/5 px-4 py-2 hover:bg-white/10">
              Undo
            </button>

            <button className="rounded-lg bg-white/5 px-4 py-2 hover:bg-white/10">
              Redo
            </button>

            <button className="rounded-lg bg-white/5 px-4 py-2 hover:bg-white/10">
              Reset
            </button>

            <button className="rounded-lg bg-white/5 px-4 py-2 hover:bg-white/10">
              Front
            </button>

            <button className="rounded-lg bg-white/5 px-4 py-2 hover:bg-white/10">
              Back
            </button>
          </div>
        </section>

        

      </div>
    </main>
  );
}