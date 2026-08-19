import type { ImageAdjustments, PrintStyle } from "./design";

interface CartBaseElement {
  id: string;

  x: number;
  y: number;

  width: number;
  height: number;

  rotation: number;

  name: string;

  visible: boolean;

  locked: boolean;
}

export interface CartImageElement extends CartBaseElement {
  type: "image";

  imageId: string;
  src: string;
  originalWidth: number;
  originalHeight: number;

  printStyle: PrintStyle;

  adjustments: ImageAdjustments;
}

export interface CartTextElement extends CartBaseElement {
  type: "text";

  text: string;

  fontSize: number;

  fill: string;

  fontFamily: string;
}

export type CartDesignElement = CartImageElement | CartTextElement;
