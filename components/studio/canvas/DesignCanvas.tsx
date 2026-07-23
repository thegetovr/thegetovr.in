"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Transformer, Rect } from "react-konva";
import { snapToElements } from "./snap";
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
    vertical: null as number | null,
    horizontal: null as number | null,
  });
  const elementRefs = useRef<Record<string, any>>({});
  const transformerRef = useRef<any>(null);
  const stageRef = useRef<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [stageScale, setStageScale] = useState(1);
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
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;

      const { width, height } =
        containerRef.current.getBoundingClientRect();

      const availableWidth = width - 48;
      const availableHeight = height - 48;

      const scale = Math.min(
        availableWidth / CANVAS.width,
        availableHeight / CANVAS.height,
        1
      );

      setStageScale(scale);
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () =>
      window.removeEventListener("resize", updateScale);
  }, []);
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
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center bg-[#ececec] overflow-hidden p-6"
    >
      <div
        className="rounded-3xl bg-transparent"
        style={{
          width: CANVAS.width * stageScale,
          height: CANVAS.height * stageScale,
        }}
      >
        <Stage
          ref={stageRef}
          width={CANVAS.width}
          height={CANVAS.height}
          scaleX={stageScale}
          scaleY={stageScale}
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
                    onDragMove={(node, width, height) => {
                      const moving = {
                        ...element,
                        x: node.x(),
                        y: node.y(),
                        width,
                        height,
                      };
                      const snapped = snapToElements(
                        moving,
                        elements,
                        SNAP_THRESHOLD,
                        PRINT_AREA,
                      );

                      node.position({
                        x: snapped.x,
                        y: snapped.y,
                      });

                      setGuides({
                        vertical: snapped.verticalGuide,
                        horizontal: snapped.horizontalGuide,
                      });

                      node.getLayer()?.batchDraw();
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
                        vertical: null,
                        horizontal: null,
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
              {guides.vertical !== null && (
                <Rect
                  x={guides.vertical}
                  y={PRINT_AREA.y}
                  width={2}
                  height={PRINT_AREA.height}
                  fill="#3b82f6"
                  listening={false}
                />
              )}

              {guides.horizontal !== null && (
                <Rect
                  x={PRINT_AREA.x}
                  y={guides.horizontal}
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
