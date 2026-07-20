"use client";

import { useRef } from "react";
import type { DesignElement } from "@/app/studio/page";

type Product = "hoodie" | "oversized" | "tshirt";

interface StudioSidebarProps {
  product: Product;
  setProduct: (product: Product) => void;
  elements: DesignElement[];
  setElements: React.Dispatch<React.SetStateAction<DesignElement[]>>;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
}

export default function StudioSidebar({
  product,
  setProduct,
  elements,
  setElements,
  selectedElementId,
  setSelectedElementId,
}: StudioSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const newElement: DesignElement = {
        id: crypto.randomUUID(),
        type: "image",
        src: reader.result as string,
        x: 170,
        y: 160,
        width: 160,
        height: 160,
        rotation: 0,
      };

      setElements((prev) => [...prev, newElement]);
      setSelectedElementId(newElement.id);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    if (!selectedElementId) return;

    setElements((prev) =>
      prev.filter((element) => element.id !== selectedElementId)
    );

    setSelectedElementId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-3xl bg-[#1d1d21] p-5">
      <h2 className="mb-6 text-3xl font-bold">
        Choose Product
      </h2>

      <div className="space-y-4">
        <button
          onClick={() => setProduct("hoodie")}
          className={`w-full rounded-xl border p-4 text-left ${
            product === "hoodie"
              ? "bg-white text-black"
              : "border-gray-700"
          }`}
        >
          HOODIE
        </button>

        <button
          onClick={() => setProduct("oversized")}
          className={`w-full rounded-xl border p-4 text-left ${
            product === "oversized"
              ? "bg-white text-black"
              : "border-gray-700"
          }`}
        >
          OVERSIZED
        </button>

        <button
          onClick={() => setProduct("tshirt")}
          className={`w-full rounded-xl border p-4 text-left ${
            product === "tshirt"
              ? "bg-white text-black"
              : "border-gray-700"
          }`}
        >
          TSHIRT
        </button>
      </div>

      <div className="mt-8 rounded-xl bg-[#2a2a2f] p-4">
        <h3 className="mb-4 font-bold">
          Colors
        </h3>

        <div className="flex gap-3">
          <div className="h-8 w-8 rounded-full border bg-black"></div>
          <div className="h-8 w-8 rounded-full bg-white"></div>
          <div className="h-8 w-8 rounded-full bg-gray-400"></div>
          <div className="h-8 w-8 rounded-full bg-green-700"></div>
        </div>
      </div>

      <div className="mt-8">
        <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed p-6 hover:bg-[#2a2a2f]">
          Add Image

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      <p className="mt-3 text-center text-sm text-green-400">
        {elements.length} image{elements.length !== 1 ? "s" : ""} added
      </p>

      <button
        onClick={handleDelete}
        disabled={!selectedElementId}
        className="mt-4 w-full rounded-xl bg-red-600 p-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Delete
      </button>

      <button className="mt-5 w-full rounded-xl border border-dashed p-6">
        Add Text
      </button>
    </div>
  );
}