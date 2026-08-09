"use client";

import { Stage, Layer } from "react-konva";
import { useEffect, useState } from "react";

import ProductMockup from "@/components/studio/canvas/ProductMockup";
import StaticImageElement from "./StaticImageElement";
import StaticTextElement from "./StaticTextElement";
import { getImage } from "@/lib/studio/imageStore";

import type { Product, ProductColor } from "@/types/design";
import type { CartDesignElement } from "@/types/cartDesign";

type DesignPreviewCanvasProps = {
  product: Product;
  productColor: ProductColor;
  view: "front" | "back";
  elements: CartDesignElement[];
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

      (async () => {
        const src = await getImage(element.imageId);

        if (!src) {
          return;
        }

        const img = new window.Image();

        img.src = src;

        img.onload = () => {
          setLoadedImages((prev) => ({
            ...prev,
            [element.id]: img,
          }));
        };
      })();
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
