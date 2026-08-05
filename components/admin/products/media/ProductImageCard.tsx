"use client";

import { useState } from "react";
import ProductPreview from "./ProductPreview";
import GalleryThumbnail from "./GalleryThumbnail";
import GalleryGrid from "./GalleryGrid";

interface ProductMedia {
  url: string;
  publicId: string;
  alt: string;
  isCover: boolean;
}

interface ProductImageCardProps {
  productId: string;
  title?: string;
  media: ProductMedia[];
  fallbackText?: string;
}

export default function ProductImageCard({
  productId,
  title = "Product Images",
  media,
  fallbackText = "No product images",
}: ProductImageCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (media.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>

        <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-zinc-700 text-sm text-zinc-500">
          {fallbackText}
        </div>
      </div>
    );
  }

  const selectedImage = media[selectedIndex];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>

      <ProductPreview src={selectedImage.url} alt={selectedImage.alt} />

      <GalleryGrid
        productId={productId}
        media={media}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
    </div>
  );
}
