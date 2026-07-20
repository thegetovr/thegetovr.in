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
import type { DesignElement } from "@/app/studio/page";
const PRINT_AREA = {
  x: 150,
  y: 140,
  width: 200,
  height: 220,
};

interface DesignCanvasProps {
  elements: DesignElement[];
  setElements: React.Dispatch<React.SetStateAction<DesignElement[]>>;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
}

export default function DesignCanvas({
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
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-100">
      <Stage
        width={500}
        height={600}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedElementId(null);
          }
        }}
      >
        <Layer>
          <Rect
            x={PRINT_AREA.x}
            y={PRINT_AREA.y}
            width={PRINT_AREA.width}
            height={PRINT_AREA.height}
            dash={[8, 8]}
            stroke="#666"
            />

          <Rect
            x={150}
            y={140}
            width={200}
            height={220}
            dash={[8, 8]}
            stroke="#666"
          />

          {elements.length === 0 && (
            <Text
              x={175}
              y={245}
              text="Design Area"
              fontSize={20}
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
  );
}