"use client";

import Image from "next/image";
import { useState } from "react";

import { ProductMedia } from "@/types/product";

interface ProductGalleryProps {
  media: ProductMedia[];
  productName: string;
}

export default function ProductGallery({
  media,
  productName,
}: ProductGalleryProps) {
  const defaultImage = media.find((image) => image.isCover) ?? media[0];

  const [selectedImage, setSelectedImage] = useState(defaultImage);

  return (
    <div>
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) shadow-(--shadow-soft)">
        {selectedImage ? (
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt || productName}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-contain object-center p-10 transition-transform duration-500 hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-(--color-text-muted)">
            No Image
          </div>
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {media.map((image) => (
            <button
              key={image.publicId}
              type="button"
              onClick={() => setSelectedImage(image)}
              aria-label={`View ${image.alt || productName}`}
              className={`flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-(--radius-md) border transition-all duration-200 ${
                selectedImage?.publicId === image.publicId
                  ? "border-(--color-text-primary) bg-(--color-surface-muted) ring-2 ring-(--color-accent)/30"
                  : "border-(--color-border) bg-(--color-surface) hover:border-(--color-text-primary) hover:bg-(--color-surface-muted)"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || productName}
                width={120}
                height={120}
                className="h-full w-full object-contain p-2"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}