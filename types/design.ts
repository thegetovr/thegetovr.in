export type Product = "hoodie" | "oversized" | "tshirt";

export type PrintStyle =
  | "original"
  | "cutout"
  | "soft-edge"
  | "vintage"
  | "premium-fade";

export interface ImageAdjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  opacity: number;
}

export interface BaseElement {
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

export interface ImageElement extends BaseElement {
  type: "image";

  src: string;

  originalWidth: number;
  originalHeight: number;

  printStyle: PrintStyle;

  adjustments: ImageAdjustments;
}

export interface TextElement extends BaseElement {
  type: "text";

  text: string;

  fontSize: number;

  fill: string;

  fontFamily: string;
}

export type DesignElement = ImageElement | TextElement;