"use client";

import { useState } from "react";

import DesignCanvas from "@/components/studio/canvas/DesignCanvas";
import StudioSidebar from "@/components/studio/StudioSidebar";
import StudioSummary from "@/components/studio/StudioSummary";

type Product = "hoodie" | "oversized" | "tshirt";

export default function StudioPage() {
  const [product, setProduct] =
    useState<Product>("hoodie");

  const [designImage, setDesignImage] =
    useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black px-8 pb-10 pt-28 text-white">
      <div className="mx-auto max-w-[1700px]">
        <h1 className="mb-10 text-5xl font-black">
          Getovr Studio
        </h1>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <StudioSidebar
              product={product}
              setProduct={setProduct}
              designImage={designImage}
              setDesignImage={setDesignImage}
            />
          </div>

          <div className="col-span-6">
            <DesignCanvas
              designImage={designImage}
            />
          </div>

          <div className="col-span-3">
            <StudioSummary />
          </div>
        </div>
      </div>
    </main>
  );
}