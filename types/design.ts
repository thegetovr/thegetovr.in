export type Product = "hoodie" | "oversized" | "tshirt";

export interface BaseElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
}

export interface TextElement extends BaseElement {
  type: "text";
  text: string;
  fontSize: number;
  fill: string;
  fontFamily: string;
}

export type DesignElement = ImageElement | TextElement;