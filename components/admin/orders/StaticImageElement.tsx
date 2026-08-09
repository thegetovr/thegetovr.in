"use client";

import { Image } from "react-konva";

import type { CartImageElement } from "@/types/cartDesign";

type StaticImageElementProps = {
  element: CartImageElement;
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
    <>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
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
    </>
  );
}