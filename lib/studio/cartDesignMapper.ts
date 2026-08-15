import type { DesignElement } from "@/types/design";
import type { CartDesignElement } from "@/types/cartDesign";

export function toCartDesign(elements: DesignElement[]): CartDesignElement[] {
  return elements.map((element) => {
    if (element.type === "image") {
      return {
        id: element.id,
        type: "image",

        imageId: element.imageId,
        src: element.src,

        x: element.x,
        y: element.y,

        width: element.width,
        height: element.height,

        rotation: element.rotation,

        name: element.name,

        visible: element.visible,

        locked: element.locked,

        originalWidth: element.originalWidth,
        originalHeight: element.originalHeight,

        printStyle: element.printStyle,

        adjustments: element.adjustments,
      };
    }

    return {
      id: element.id,
      type: "text",

      text: element.text,

      x: element.x,
      y: element.y,

      width: element.width,
      height: element.height,

      rotation: element.rotation,

      name: element.name,

      visible: element.visible,

      locked: element.locked,

      fontSize: element.fontSize,

      fill: element.fill,

      fontFamily: element.fontFamily,
    };
  });
}
