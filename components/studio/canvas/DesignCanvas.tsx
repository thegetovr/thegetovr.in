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
            x={100}
            y={50}
            width={300}
            height={450}
            cornerRadius={20}
            fill="white"
            stroke="black"
            strokeWidth={2}
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
              onClick={() => setSelectedElementId(element.id)}
              onTap={() => setSelectedElementId(element.id)}
              onDragEnd={(e) => {
                setElements((prev) =>
                  prev.map((item) =>
                    item.id === element.id
                      ? {
                          ...item,
                          x: e.target.x(),
                          y: e.target.y(),
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

                setElements((prev) =>
                  prev.map((item) =>
                    item.id === element.id
                      ? {
                          ...item,
                          x: node.x(),
                          y: node.y(),
                          rotation: node.rotation(),
                          width: Math.max(20, node.width() * scaleX),
                          height: Math.max(20, node.height() * scaleY),
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
          />
        </Layer>
      </Stage>
    </div>
  );
}