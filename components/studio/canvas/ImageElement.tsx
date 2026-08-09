import { Image } from "react-konva";
import Konva from "konva";
import { useEffect, useRef } from "react";
import type { DesignElement } from "@/types/design";

interface ImageElementProps {
  element: Extract<DesignElement, { type: "image" }>;
  image?: HTMLImageElement;

  printArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  onSelect: () => void;

  onDragEnd: (id: string, x: number, y: number) => void;

  onDragMove?: (node: Konva.Image, width: number, height: number) => void;

  onTransformEnd: (
    id: string,
    node: Konva.Image,
    scaleX: number,
    scaleY: number,
  ) => void;

  dragBoundFunc: (pos: { x: number; y: number }) => {
    x: number;
    y: number;
  };

  nodeRef: (node: Konva.Image | null) => void;
}

export default function ImageElement({
  element,
  image,
  onSelect,
  onDragMove,
  onDragEnd,
  onTransformEnd,
  dragBoundFunc,
  nodeRef,
}: ImageElementProps) {
  const imageRef = useRef<Konva.Image | null>(null);

  useEffect(() => {
    imageRef.current?.getLayer()?.batchDraw();
  }, [element.visible]);
  return (
    <Image
      alt=""
      opacity={element.visible ? 1 : 0}
      ref={(node) => {
        imageRef.current = node;
        nodeRef(node);
      }}
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation}
      draggable
      dragBoundFunc={dragBoundFunc}
      onDragMove={(e) => {
        onDragMove?.(e.target as Konva.Image, element.width, element.height);
      }}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onDragEnd(element.id, e.target.x(), e.target.y());
      }}
      onTransformEnd={(e) => {
        const node = e.target as Konva.Image;

        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        onTransformEnd(element.id, node, scaleX, scaleY);
      }}
    />
  );
}
