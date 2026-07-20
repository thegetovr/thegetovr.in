"use client";

import { useEffect, useState } from "react";
import { Image } from "react-konva";
import { MOCKUP } from "./constants";

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
      setImage(img);
    };
  }, [product]);

  if (!image) return null;

  return (
    <Image
      image={image}
      x={MOCKUP.x}
      y={MOCKUP.y}
      width={MOCKUP.width}
      height={MOCKUP.height}
      listening={false}
    />
  );
}