"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
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
import type {
  DesignElement,
  Product,
} from "@/types/design";

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
const [zoom, setZoom] = useState(1);

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
  const downloadDesign = () => {
  if (!stageRef.current) return;

  const uri = stageRef.current.toDataURL({
    pixelRatio: 3,
  });

  const link = document.createElement("a");
  link.download = `${product}-design.png`;
  link.href = uri;
  link.click();
};
  const clampPosition = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const visibleRatio = 0.3;

  return {
    x: Math.min(
      Math.max(
        x,
        PRINT_AREA.x - width * (1 - visibleRatio)
      ),
      PRINT_AREA.x +
        PRINT_AREA.width -
        width * visibleRatio
    ),

    y: Math.min(
      Math.max(
        y,
        PRINT_AREA.y - height * (1 - visibleRatio)
      ),
      PRINT_AREA.y +
        PRINT_AREA.height -
        height * visibleRatio
    ),
  };
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
            <ProductMockup product={product} />

            
          

            {elements.map((element) => {
              if (element.type === "image") {
                return (
                  <Image
                    key={element.id}
                    ref={(node) => {
                      if (node) {
                        elementRefs.current[element.id] = node;
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
                );
              }

              return (
                <Text
                  key={element.id}
                  ref={(node) => {
                    if (node) {
                      elementRefs.current[element.id] = node;
                    }
                  }}
                  x={element.x}
                  y={element.y}
                  width={element.width}
                  rotation={element.rotation}
                  text={element.text}
                  fontSize={element.fontSize}
                  fill={element.fill}
                  fontFamily={element.fontFamily}
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

  node.scaleX(1);
  node.scaleY(1);

  setElements((prev) =>
    prev.map((item) => {
      if (item.id !== element.id) {
        return item;
      }

      if (item.type !== "text") {
        return item;
      }

      return {
        ...item,
        x: node.x(),
        y: node.y(),
        rotation: node.rotation(),
        width: node.width() * scaleX,
        fontSize: Math.max(
          12,
          item.fontSize * scaleX
        ),
      };
    })
  );
}}
                />
              );
            })}

            <Transformer
              ref={transformerRef}
              rotateEnabled
              keepRatio={false}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}