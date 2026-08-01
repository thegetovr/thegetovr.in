"use client";

import { Stage, Layer } from "react-konva";
import { useEffect, useState } from "react";

import ProductMockup from "@/components/studio/canvas/ProductMockup";
import StaticImageElement from "./StaticImageElement";
import StaticTextElement from "./StaticTextElement";
import { CANVAS } from "@/components/studio/canvas/constants";

import type { DesignElement, Product, ProductColor } from "@/types/design";

type DesignPreviewCanvasProps = {
  product: Product;
  productColor: ProductColor;
  view: "front" | "back";
  elements: DesignElement[];
};

export default function DesignPreviewCanvas({
  product,
  productColor,
  view,
  elements,
}: DesignPreviewCanvasProps) {
  const [loadedImages, setLoadedImages] = useState<
    Record<string, HTMLImageElement>
  >({});

  useEffect(() => {
    elements.forEach((element) => {
      if (element.type !== "image") return;

      if (loadedImages[element.id]) return;

      const img = new window.Image();

      img.src = element.src;

      img.onload = () => {
        setLoadedImages((prev) => ({
          ...prev,
          [element.id]: img,
        }));
      };
    });
  }, [elements, loadedImages]);

  return (
    <div className="overflow-hidden rounded-xl bg-[#ececec]">
      <Stage width={320} height={320} scaleX={0.45} scaleY={0.45}>
        <Layer>
          <ProductMockup
            product={product}
            productColor={productColor}
            view={view}
            offsetY={20}
          />
          {elements.map((element) => {
            if (element.type === "image") {
              return (
                <StaticImageElement
                  key={element.id}
                  element={element}
                  image={loadedImages[element.id]}
                />
              );
            }

            return <StaticTextElement key={element.id} element={element} />;
          })}
        </Layer>
      </Stage>
    </div>
  );
}
