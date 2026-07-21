"use client";

import { useRef } from "react";
import {
  Shirt,
  ImagePlus,
  Type,
  Trash2,
  Palette,
} from "lucide-react";
import type {
  DesignElement,
  Product,
  TextElement,
} from "@/types/design";

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

  const selectedText =
    elements.find(
      (element) =>
        element.id === selectedElementId &&
        element.type === "text"
    ) as TextElement | undefined;

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

  const handleAddText = () => {
    const newText: TextElement = {
      id: crypto.randomUUID(),
      type: "text",
      text: "Your Text",
      x: 170,
      y: 180,
      width: 200,
      height: 50,
      rotation: 0,
      fontSize: 32,
      fill: "#000000",
      fontFamily: "Arial",
    };

    setElements((prev) => [...prev, newText]);
    setSelectedElementId(newText.id);
  };

  const updateSelectedText = (
    updates: Partial<TextElement>
  ) => {
    if (!selectedText) return;

    setElements((prev) =>
      prev.map((element) => {
        if (element.id !== selectedText.id || element.type !== "text") {
          return element;
        }

        return {
          ...element,
          ...updates,
        } as TextElement;
      })
    );
  };

  const handleDelete = () => {
    if (!selectedElementId) return;

    setElements((prev) =>
      prev.filter(
        (element) => element.id !== selectedElementId
      )
    );

    setSelectedElementId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-3xl bg-[#1d1d21] p-5">
      <div className="mb-8">
  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
    Products
  </p>

  <h2 className="mt-2 text-2xl font-bold">
    Choose Apparel
  </h2>
</div>

      <div className="space-y-3">

  <button
    onClick={() => setProduct("hoodie")}
    className={`flex w-full items-center gap-4 rounded-2xl border p-4 transition ${
      product === "hoodie"
        ? "border-white bg-white text-black shadow-lg"
        : "border-white/10 bg-[#232329] hover:bg-[#2b2b31]"
    }`}
  >
    <span className="text-2xl">🧥</span>

    <div className="text-left">
      <p className="font-semibold">Hoodie</p>
      <p className="text-xs opacity-70">
        Premium Hoodie
      </p>
    </div>
  </button>

  <button
    onClick={() => setProduct("oversized")}
    className={`flex w-full items-center gap-4 rounded-2xl border p-4 transition ${
      product === "oversized"
        ? "border-white bg-white text-black shadow-lg"
        : "border-white/10 bg-[#232329] hover:bg-[#2b2b31]"
    }`}
  >
    <span className="text-2xl">👕</span>

    <div className="text-left">
      <p className="font-semibold">Oversized</p>
      <p className="text-xs opacity-70">
        Oversized Tee
      </p>
    </div>
  </button>

  <button
    onClick={() => setProduct("tshirt")}
    className={`flex w-full items-center gap-4 rounded-2xl border p-4 transition ${
      product === "tshirt"
        ? "border-white bg-white text-black shadow-lg"
        : "border-white/10 bg-[#232329] hover:bg-[#2b2b31]"
    }`}
  >
    <span className="text-2xl">👕</span>

    <div className="text-left">
      <p className="font-semibold">T-Shirt</p>
      <p className="text-xs opacity-70">
        Regular Fit
      </p>
    </div>
  </button>

</div>

      <div className="mt-8">

  <div className="mb-4 flex items-center gap-2">
    <Palette size={16} />
    <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
      Colors
    </h3>
  </div>

  <div className="grid grid-cols-4 gap-3">

    <button className="h-12 rounded-xl border-2 border-white bg-black transition hover:scale-105" />

    <button className="h-12 rounded-xl bg-white transition hover:scale-105" />

    <button className="h-12 rounded-xl bg-gray-400 transition hover:scale-105" />

    <button className="h-12 rounded-xl bg-green-700 transition hover:scale-105" />

  </div>

</div>

      <div className="mt-8">
        <label className="mt-8 flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-[#232329] p-5 transition hover:bg-[#2c2c33]">
          <>
  <ImagePlus size={24} />

  <div>
    <p className="font-semibold">
      Upload Design
    </p>

    <p className="text-sm text-gray-400">
      PNG or JPG
    </p>
  </div>
</>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      <button
        onClick={handleAddText}
        className="mt-5 w-full rounded-xl border border-dashed p-6 hover:bg-[#2a2a2f]"
      >
        <button
  onClick={handleAddText}
  className="mt-4 flex w-full items-center gap-4 rounded-2xl bg-[#232329] p-5 transition hover:bg-[#2c2c33]"
>
  <Type size={24} />

  <div className="text-left">
    <p className="font-semibold">
      Add Text
    </p>

    <p className="text-sm text-gray-400">
      Headlines & slogans
    </p>
  </div>
</button>
      </button>

      {selectedText && (
        <div className="mt-6 rounded-xl bg-[#2a2a2f] p-4 space-y-4">
          <h3 className="font-bold">Edit Text</h3>

          <input
            value={selectedText.text}
            onChange={(e) =>
              updateSelectedText({
                text: e.target.value,
              })
            }
            className="w-full rounded-lg bg-[#1d1d21] p-3 outline-none"
            placeholder="Enter text"
          />

          <div>
            <label className="mb-2 block text-sm">
              Font Size
            </label>

            <input
              type="range"
              min={12}
              max={100}
              value={selectedText.fontSize}
              onChange={(e) =>
                updateSelectedText({
                  fontSize: Number(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
  <label className="mb-2 block text-sm">
    Font
  </label>

  <select
    value={selectedText.fontFamily}
    onChange={(e) =>
      updateSelectedText({
        fontFamily: e.target.value,
      })
    }
    className="mb-4 w-full rounded-lg bg-[#1d1d21] p-3 outline-none"
  >
    <option value="Arial">Arial</option>
    <option value="Inter">Inter</option>
    <option value="Poppins">Poppins</option>
    <option value="Montserrat">Montserrat</option>
    <option value="Oswald">Oswald</option>
    <option value="Bebas Neue">Bebas Neue</option>
  </select>

  <label className="mb-2 block text-sm">
    Text Color
  </label>

  <input
    type="color"
    value={selectedText.fill}
    onChange={(e) =>
      updateSelectedText({
        fill: e.target.value,
      })
    }
    className="h-12 w-full"
  />
</div>
        </div>
      )}

      <p className="mt-4 text-center text-sm text-green-400">
        {elements.length} element
        {elements.length !== 1 ? "s" : ""} added
      </p>

      <button
        onClick={handleDelete}
        disabled={!selectedElementId}
        className="mt-4 w-full rounded-xl bg-red-600 p-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div className="flex items-center justify-center gap-2">
  <Trash2 size={18} />
  Delete
</div>
      </button>
    </div>
  );
}