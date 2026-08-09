"use client";

import { useEffect, useState } from "react";
import { Image } from "react-konva";
import { CANVAS, PRODUCT_CONFIG } from "./constants";
import { ProductColor } from "@/types/design";

type Product = "hoodie" | "oversized" | "tshirt";

interface ProductMockupProps {
  product: Product;
  productColor: ProductColor;
  view: "front" | "back";
  offsetY?: number;
}

export default function ProductMockup({
  product,
  productColor,
  view,
  offsetY,
}: ProductMockupProps) {
  const [image, setImage] =
    useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();

    img.src = `/mockups/${product}/${view}/${productColor}.png`;

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
  }, [product, productColor, view]);

  if (!image) return null;

  // Preserve aspect ratio
  const aspect = image.naturalWidth / image.naturalHeight;

  const layout = PRODUCT_CONFIG[product].mockup;

  const targetHeight = layout.height;
  const targetWidth = targetHeight * aspect;

  return (
    <Image
  alt=""
  image={image}
      x={(CANVAS.width - targetWidth) / 2}
      y={offsetY ?? layout.offsetY}
      width={targetWidth}
      height={targetHeight}
      listening={false}
    />
  );
}