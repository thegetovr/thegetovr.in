"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Transformer, Rect } from "react-konva";

import ProductMockup from "./ProductMockup";
import ImageElement from "./ImageElement";
import TextElement from "./TextElement";

import { CANVAS, PRINT_AREAS, SNAP_THRESHOLD } from "./constants";

import type { DesignElement, Product } from "@/types/design";

interface DesignCanvasProps {
  product: Product;
  productColor: "black" | "white" | "gray" | "green";
  view: "front" | "back";
  elements: DesignElement[];
  setElements: React.Dispatch<React.SetStateAction<DesignElement[]>>;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
}

export default function DesignCanvas({
  product,
  productColor,
  view,
  elements,
  setElements,
  selectedElementId,
  setSelectedElementId,
}: DesignCanvasProps) {
  const [loadedImages, setLoadedImages] = useState<
    Record<string, HTMLImageElement>
  >({});
  const [zoom, setZoom] = useState(1);
  const [guides, setGuides] = useState({
    vertical: false,
    horizontal: false,
  });
  const elementRefs = useRef<Record<string, any>>({});
  const transformerRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
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

  useEffect(() => {
    if (!transformerRef.current) return;

    if (!selectedElementId) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
      return;
    }

    const node = elementRefs.current[selectedElementId];

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
    height: number,
  ) => {
    const visibleRatio = 0.3;

    return {
      x: Math.min(
        Math.max(x, PRINT_AREA.x - width * (1 - visibleRatio)),
        PRINT_AREA.x + PRINT_AREA.width - width * visibleRatio,
      ),

      y: Math.min(
        Math.max(y, PRINT_AREA.y - height * (1 - visibleRatio)),
        PRINT_AREA.y + PRINT_AREA.height - height * visibleRatio,
      ),
    };
  };
  const snapToCenter = (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    const centerX = PRINT_AREA.x + PRINT_AREA.width / 2;
    const centerY = PRINT_AREA.y + PRINT_AREA.height / 2;

    let snappedX = x;
    let snappedY = y;

    const elementCenterX = x + width / 2;
    const elementCenterY = y + height / 2;

    if (Math.abs(elementCenterX - centerX) < SNAP_THRESHOLD) {
      snappedX = centerX - width / 2;
    }

    if (Math.abs(elementCenterY - centerY) < SNAP_THRESHOLD) {
      snappedY = centerY - height / 2;
    }

    return {
      x: snappedX,
      y: snappedY,
    };
  };
  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setElements((prev) =>
      prev.map((item) =>
        item.id === id
          ? ({
              ...item,
              ...updates,
            } as DesignElement)
          : item,
      ),
    );
  };
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#ececec] overflow-auto p-6">
      <div className="rounded-3xl bg-transparent">
        <Stage
          ref={stageRef}
          width={CANVAS.width}
          height={CANVAS.height}
          onMouseDown={(e) => {
            if (e.target === e.target.getStage()) {
              setSelectedElementId(null);
            }
          }}
        >
          <Layer>
            <ProductMockup
              product={product}
              productColor={productColor}
              view={view}
            />
            {elements.map((element) => {
              if (element.type === "image") {
                return (
                  <ImageElement
                    key={element.id}
                    element={element}
                    image={loadedImages[element.id]}
                    printArea={PRINT_AREA}
                    nodeRef={(node) => {
                      if (node) {
                        elementRefs.current[element.id] = node;
                      }
                    }}
                    onSelect={() => setSelectedElementId(element.id)}
                    dragBoundFunc={(pos) =>
                      clampPosition(pos.x, pos.y, element.width, element.height)
                    }
                    onDragMove={(x, y, width, height) => {
  const centerX = PRINT_AREA.x + PRINT_AREA.width / 2;
  const centerY = PRINT_AREA.y + PRINT_AREA.height / 2;

  const elementCenterX = x + width / 2;
  const elementCenterY = y + height / 2;

  const vertical =
    Math.abs(elementCenterX - centerX) < SNAP_THRESHOLD;

  const horizontal =
    Math.abs(elementCenterY - centerY) < SNAP_THRESHOLD;

  setGuides({
    vertical,
    horizontal,
  });

  if (vertical) {
    x = centerX - width / 2;
  }

  if (horizontal) {
    y = centerY - height / 2;
  }

  updateElement(element.id, {
    x,
    y,
  });
}}
                    onDragEnd={(id, x, y) => {
                      const clamped = clampPosition(
                        x,
                        y,
                        element.width,
                        element.height,
                      );

                      const position = snapToCenter(
                        clamped.x,
                        clamped.y,
                        element.width,
                        element.height,
                      );
                      setGuides({
                        vertical: false,
                        horizontal: false,
                      });
                      updateElement(id, {
                        x: position.x,
                        y: position.y,
                      });
                    }}
                    onTransformEnd={(id, node, scaleX, scaleY) => {
                      let width = Math.max(20, node.width() * scaleX);

                      let height = Math.max(20, node.height() * scaleY);

                      width = Math.min(width, PRINT_AREA.width);

                      height = Math.min(height, PRINT_AREA.height);

                      const position = clampPosition(
                        node.x(),
                        node.y(),
                        width,
                        height,
                      );

                      updateElement(id, {
                        x: position.x,
                        y: position.y,
                        width,
                        height,
                        rotation: node.rotation(),
                      });
                    }}
                  />
                );
              }

              return (
                <TextElement
                  key={element.id}
                  element={element}
                  nodeRef={(node) => {
                    if (node) {
                      elementRefs.current[element.id] = node;
                    }
                  }}
                  onSelect={() => setSelectedElementId(element.id)}
                  onDragEnd={(id, x, y) => {
                    updateElement(id, {
                      x,
                      y,
                    });
                  }}
                  onTransformEnd={(id, node, scaleX) => {
                    updateElement(id, {
                      x: node.x(),
                      y: node.y(),
                      rotation: node.rotation(),
                      width: node.width() * scaleX,
                      fontSize: Math.max(12, element.fontSize * scaleX),
                    });
                  }}
                />
              );
            })}
            <>
              {guides.vertical && (
                <Rect
                  x={PRINT_AREA.x + PRINT_AREA.width / 2}
                  y={PRINT_AREA.y}
                  width={2}
                  height={PRINT_AREA.height}
                  fill="#3b82f6"
                  listening={false}
                />
              )}

              {guides.horizontal && (
                <Rect
                  x={PRINT_AREA.x}
                  y={PRINT_AREA.y + PRINT_AREA.height / 2}
                  width={PRINT_AREA.width}
                  height={2}
                  fill="#3b82f6"
                  listening={false}
                />
              )}

              <Transformer
                ref={transformerRef}
                rotateEnabled
                keepRatio={false}
              />
            </>
            <>
              {guides.vertical && (
                <Rect
                  x={PRINT_AREA.x + PRINT_AREA.width / 2}
                  y={PRINT_AREA.y}
                  width={2}
                  height={PRINT_AREA.height}
                  fill="#3b82f6"
                  listening={false}
                />
              )}

              {guides.horizontal && (
                <Rect
                  x={PRINT_AREA.x}
                  y={PRINT_AREA.y + PRINT_AREA.height / 2}
                  width={PRINT_AREA.width}
                  height={2}
                  fill="#3b82f6"
                  listening={false}
                />
              )}

              <Transformer
                ref={transformerRef}
                rotateEnabled
                keepRatio={false}
              />
            </>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
