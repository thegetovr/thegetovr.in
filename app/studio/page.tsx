"use client";

import { useState } from "react";

import CanvasArea from "@/components/studio/CanvasArea";
import StudioSidebar from "@/components/studio/StudioSidebar";
import StudioSummary from "@/components/studio/StudioSummary";

type Product = "hoodie" | "oversized" | "tshirt";

export default function StudioPage() {
  const [product, setProduct] =
    useState<Product>("hoodie");

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
            />

          </div>

          <div className="col-span-6">

            <CanvasArea
              product={product}
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