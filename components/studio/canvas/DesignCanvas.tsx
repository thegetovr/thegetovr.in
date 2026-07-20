"use client";

import { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Image,
  Transformer,
} from "react-konva";

import ProductMockup from "./ProductMockup";
import { CANVAS, PRINT_AREAS } from "./constants";
import type { DesignElement } from "@/app/studio/page";


type Product = "hoodie" | "oversized" | "tshirt";

interface DesignCanvasProps {
  product: Product;
  elements: DesignElement[];
  setElements: React.Dispatch<React.SetStateAction<DesignElement[]>>;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
}

export default function DesignCanvas({
  product,
  elements,
  setElements,
  selectedElementId,
  setSelectedElementId,
}: DesignCanvasProps) {
  const [loadedImages, setLoadedImages] = useState<
    Record<string, HTMLImageElement>
  >({});

  const imageRefs = useRef<Record<string, any>>({});
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    elements.forEach((element) => {
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

  useEffect(() => {
    if (!transformerRef.current) return;

    if (!selectedElementId) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
      return;
    }

    const node = imageRefs.current[selectedElementId];

    if (node) {
      transformerRef.current.nodes([node]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedElementId, loadedImages]);
  const PRINT_AREA = PRINT_AREAS[product];
const clampPosition = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return {
    x: Math.min(
      Math.max(x, PRINT_AREA.x),
      PRINT_AREA.x + PRINT_AREA.width - width
    ),
    y: Math.min(
      Math.max(y, PRINT_AREA.y),
      PRINT_AREA.y + PRINT_AREA.height - height
    ),
  };
};
  return (
  <div className="flex h-full w-full items-center justify-center bg-[#ececec] p-10">
    <div className="rounded-2xl bg-white p-8 shadow-2xl">
      <Stage
        width={CANVAS.width}
        height={CANVAS.height}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedElementId(null);
          }
        }}
      >
        <Layer>
        <ProductMockup product={product} />
          <Rect
            x={PRINT_AREA.x}
            y={PRINT_AREA.y}
            width={PRINT_AREA.width}
            height={PRINT_AREA.height}
            dash={[8, 8]}
            stroke="#666"
            />

        

          {elements.length === 0 && (
            <Text
              x={250}
               y={300}
               width={200}
              align="center"
              text="Upload a logo to begin"
              fontSize={18}
                fill="#8a8a8a"
              />
          )}

          {elements.map((element) => (
            <Image
              key={element.id}
              ref={(node) => {
                if (node) {
                  imageRefs.current[element.id] = node;
                }
              }}
              image={loadedImages[element.id]}
              x={element.x}
              y={element.y}
              width={element.width}
              height={element.height}
              rotation={element.rotation}
              draggable
              dragBoundFunc={(pos) =>
  clampPosition(
    pos.x,
    pos.y,
    element.width,
    element.height
  )
}
              onClick={() => setSelectedElementId(element.id)}
              onTap={() => setSelectedElementId(element.id)}
              onDragEnd={(e) => {
  const position = clampPosition(
    e.target.x(),
    e.target.y(),
    element.width,
    element.height
  );

  e.target.position(position);

  setElements((prev) =>
    prev.map((item) =>
      item.id === element.id
        ? {
            ...item,
            x: position.x,
            y: position.y,
          }
        : item
    )
  );
}}
              onTransformEnd={(e) => {
  const node = e.target;

  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  node.scaleX(1);
  node.scaleY(1);

  let width = Math.max(20, node.width() * scaleX);
  let height = Math.max(20, node.height() * scaleY);

  width = Math.min(width, PRINT_AREA.width);
  height = Math.min(height, PRINT_AREA.height);

  const position = clampPosition(
    node.x(),
    node.y(),
    width,
    height
  );

  node.position(position);

  setElements((prev) =>
    prev.map((item) =>
      item.id === element.id
        ? {
            ...item,
            x: position.x,
            y: position.y,
            width,
            height,
            rotation: node.rotation(),
          }
        : item
    )
  );
}}
            />
          ))}

          <Transformer
  ref={transformerRef}
  rotateEnabled
  keepRatio
  boundBoxFunc={(oldBox, newBox) => {
    const maxWidth = PRINT_AREA.width;
    const maxHeight = PRINT_AREA.height;

    if (
      newBox.width > maxWidth ||
      newBox.height > maxHeight ||
      newBox.width < 20 ||
      newBox.height < 20
    ) {
      return oldBox;
    }

    return newBox;
  }}
/>
        </Layer>
      </Stage>
      </div>
    </div>
  );
}