"use client";

import { Text } from "react-konva";

import type { TextElement } from "@/types/design";

type StaticTextElementProps = {
  element: TextElement;
};

export default function StaticTextElement({
  element,
}: StaticTextElementProps) {
  return (
    <Text
      text={element.text}
      x={element.x}
      y={element.y}
      width={element.width}
      rotation={element.rotation}
      fontSize={element.fontSize}
      fontFamily={element.fontFamily}
      fill={element.fill}
      listening={false}
    />
  );
}