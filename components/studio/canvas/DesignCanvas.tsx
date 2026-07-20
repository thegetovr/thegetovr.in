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

interface DesignCanvasProps {
  designImage: string | null;
}

export default function DesignCanvas({
  designImage,
}: DesignCanvasProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const imageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

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

  useEffect(() => {
    if (image && imageRef.current && transformerRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [image]);

  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-100">
      <Stage width={500} height={600}>
        <Layer>

          {/* Shirt Placeholder */}
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
            <>
              <Image
                ref={imageRef}
                image={image}
                x={170}
                y={160}
                width={160}
                height={160}
                draggable
              />

              <Transformer
                ref={transformerRef}
                rotateEnabled
                keepRatio
              />
            </>
          )}

        </Layer>
      </Stage>
    </div>
  );
}