"use client";

import { useRef } from "react";

type Product = "hoodie" | "oversized" | "tshirt";

interface StudioSidebarProps {
  product: Product;
  setProduct: (product: Product) => void;
  designImage: string | null;
  setDesignImage: (image: string | null) => void;
}

export default function StudioSidebar({
  product,
  setProduct,
  designImage,
  setDesignImage,
}: StudioSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setDesignImage(reader.result as string);

      // Reset input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveDesign = () => {
    setDesignImage(null);

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
          {designImage ? "Replace Design" : "Upload Design"}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      {designImage && (
        <>
          <p className="mt-3 text-center text-sm text-green-400">
            ✔ Image uploaded
          </p>

          <button
            onClick={handleRemoveDesign}
            className="mt-4 w-full rounded-xl bg-red-600 p-3 font-semibold transition hover:bg-red-700"
          >
            Remove Design
          </button>
        </>
      )}

      <button className="mt-5 w-full rounded-xl border border-dashed p-6">
        Add Text
      </button>
    </div>
  );
}