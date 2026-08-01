"use client";

import { Image } from "react-konva";

import type { ImageElement } from "@/types/design";

type StaticImageElementProps = {
  element: ImageElement;
  image?: HTMLImageElement;
};

export default function StaticImageElement({
  element,
  image,
}: StaticImageElementProps) {
  if (!image) {
    return null;
  }

  return (
    <Image
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation}
      opacity={element.adjustments.opacity / 100}
      listening={false}
    />
  );
}