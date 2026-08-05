"use client";

import { useMemo, useState } from "react";
import ProductPreview from "./ProductPreview";
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
  const [selectedPublicId, setSelectedPublicId] = useState(
    media[0]?.publicId ?? "",
  );

  const selectedImage = useMemo(() => {
    const image = media.find(
      (item) => item.publicId === selectedPublicId,
    );

    return image ?? media[0];
  }, [media, selectedPublicId]);

  if (media.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">
          {title}
        </h2>

        <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-zinc-700 text-sm text-zinc-500">
          {fallbackText}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">
        {title}
      </h2>

      <ProductPreview
        src={selectedImage.url}
        alt={selectedImage.alt}
      />

      <GalleryGrid
        productId={productId}
        media={media}
        selectedPublicId={selectedPublicId}
        onSelect={setSelectedPublicId}
      />
    </div>
  );
}