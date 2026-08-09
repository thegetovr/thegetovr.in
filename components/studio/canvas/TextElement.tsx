import { Text } from "react-konva";
import Konva from "konva";
import type { DesignElement } from "@/types/design";

interface TextElementProps {
  element: Extract<DesignElement, { type: "text" }>;
  onSelect: () => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onTransformEnd: (id: string, node: Konva.Text, scaleX: number) => void;

  nodeRef: (node: Konva.Text | null) => void;
}

export default function TextElement({
  element,
  onSelect,
  onDragEnd,
  onTransformEnd,
  nodeRef,
}: TextElementProps) {
  return (
    <Text
      ref={nodeRef}
      x={element.x}
      y={element.y}
      width={element.width}
      rotation={element.rotation}
      text={element.text}
      fontSize={element.fontSize}
      fill={element.fill}
      fontFamily={element.fontFamily}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onDragEnd(element.id, e.target.x(), e.target.y());
      }}
      onTransformEnd={(e) => {
        const node = e.target as Konva.Text;

        const scaleX = node.scaleX();

        node.scaleX(1);
        node.scaleY(1);

        onTransformEnd(element.id, node, scaleX);
      }}
    />
  );
}
