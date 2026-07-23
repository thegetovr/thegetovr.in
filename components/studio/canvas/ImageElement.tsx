import { Image } from "react-konva";
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

  onDragMove?: (node: any, width: number, height: number) => void;

  onTransformEnd: (
    id: string,
    node: any,
    scaleX: number,
    scaleY: number,
  ) => void;

  dragBoundFunc: (pos: { x: number; y: number }) => {
    x: number;
    y: number;
  };

  nodeRef: (node: any) => void;
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
  return (
    <Image
      ref={nodeRef}
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation}
      draggable
      dragBoundFunc={dragBoundFunc}
      onDragMove={(e) => {
  onDragMove?.(
    e.target,
    element.width,
    element.height,
  );
}}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onDragEnd(element.id, e.target.x(), e.target.y());
      }}
      onTransformEnd={(e) => {
        const node = e.target;

        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        onTransformEnd(element.id, node, scaleX, scaleY);
      }}
    />
  );
}
