"use client";

import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Text, Image } from "react-konva";

interface DesignCanvasProps {
  designImage: string | null;
}

export default function DesignCanvas({
  designImage,
}: DesignCanvasProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!designImage) {
      setImage(null);
      return;
    }

    const img = new window.Image();
    img.src = designImage;

    img.onload = () => {
      setImage(img);
    };
  }, [designImage]);

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-xl">
      <Stage width={500} height={600}>
        <Layer>

          {/* Shirt Placeholder */}
          <Rect
            x={100}
            y={50}
            width={300}
            height={450}
            cornerRadius={20}
            fill="#ffffff"
            stroke="#000"
            strokeWidth={2}
          />

          {/* Print Area */}
          <Rect
            x={150}
            y={140}
            width={200}
            height={220}
            dash={[8, 8]}
            stroke="#666"
          />

          {!image && (
            <Text
              x={175}
              y={245}
              text="Design Area"
              fontSize={20}
            />
          )}

          {image && (
            <Image
              image={image}
              x={170}
              y={160}
              width={160}
              height={160}
              draggable
            />
          )}

        </Layer>
      </Stage>
    </div>
  );
}