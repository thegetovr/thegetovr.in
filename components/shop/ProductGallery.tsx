"use client";
import { useState } from "react";
import Image from "next/image";

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
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-2xl">
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
          <div className="flex h-full items-center justify-center text-zinc-500">
            No Image
          </div>
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {media.map((image) => (
            <div
              key={image.publicId}
              onClick={() => setSelectedImage(image)}
              className={`flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-xl border transition-all duration-200 ${
                selectedImage?.publicId === image.publicId
                  ? "border-white bg-zinc-800 ring-2 ring-white/20"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
