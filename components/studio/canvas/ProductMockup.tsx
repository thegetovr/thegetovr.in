"use client";

import { useEffect, useState } from "react";
import { Image } from "react-konva";
import { CANVAS } from "./constants";

type Product = "hoodie" | "oversized" | "tshirt";

interface ProductMockupProps {
  product: Product;
}

const mockupSources = {
  hoodie: "/mockups/hoodie.png",
  oversized: "/mockups/oversized-tshirt.png",
  tshirt: "/mockups/tshirt.png",
};

export default function ProductMockup({
  product,
}: ProductMockupProps) {
  const [image, setImage] =
    useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();

    img.src = mockupSources[product];

    img.onload = () => {
      console.log(
        "Product:",
        product,
        "Size:",
        img.naturalWidth,
        "x",
        img.naturalHeight
      );

      setImage(img);
    };
  }, [product]);

  if (!image) return null;

  // Preserve aspect ratio
  const aspect = image.naturalWidth / image.naturalHeight;

  const targetHeight = 560;
  const targetWidth = targetHeight * aspect;

  return (
    <Image
      image={image}
      x={(CANVAS.width - targetWidth) / 2}
      y={30}
      width={targetWidth}
      height={targetHeight}
      listening={false}
    />
  );
}