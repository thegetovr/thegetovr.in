import type { DesignElement } from "@/types/design";

export interface SnapResult {
  x: number;
  y: number;
  verticalGuide: number | null;
  horizontalGuide: number | null;
}

export function snapToElements(
  moving: DesignElement,
  elements: DesignElement[],
  threshold: number,
  printArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
): SnapResult {
  let x = moving.x;
  let y = moving.y;

  let verticalGuide: number | null = null;
  let horizontalGuide: number | null = null;
  let bestVerticalDistance = threshold + 1;
  let bestHorizontalDistance = threshold + 1;

  const movingPointsX = [
    moving.x,
    moving.x + moving.width / 2,
    moving.x + moving.width,
  ];
  const canvasPointsX = [
    printArea.x,
    printArea.x + printArea.width / 2,
    printArea.x + printArea.width,
  ];

  const canvasPointsY = [
    printArea.y,
    printArea.y + printArea.height / 2,
    printArea.y + printArea.height,
  ];
  const movingPointsY = [
    moving.y,
    moving.y + moving.height / 2,
    moving.y + moving.height,
  ];
  movingPointsX.forEach((movingPoint, movingIndex) => {
    canvasPointsX.forEach((targetPoint) => {
      const distance = Math.abs(movingPoint - targetPoint);

      if (distance < bestVerticalDistance) {
        const offsets = [0, moving.width / 2, moving.width];

        x = targetPoint - offsets[movingIndex];
        verticalGuide = targetPoint;
        bestVerticalDistance = distance;
      }
    });
  });

  movingPointsY.forEach((movingPoint, movingIndex) => {
    canvasPointsY.forEach((targetPoint) => {
      const distance = Math.abs(movingPoint - targetPoint);

      if (distance < bestHorizontalDistance) {
        const offsets = [0, moving.height / 2, moving.height];

        y = targetPoint - offsets[movingIndex];
        horizontalGuide = targetPoint;
        bestHorizontalDistance = distance;
      }
    });
  });
  for (const element of elements) {
    if (element.id === moving.id) continue;

    const targetPointsX = [
      element.x,
      element.x + element.width / 2,
      element.x + element.width,
    ];

    const targetPointsY = [
      element.y,
      element.y + element.height / 2,
      element.y + element.height,
    ];

    movingPointsX.forEach((movingPoint, movingIndex) => {
      targetPointsX.forEach((targetPoint) => {
        const distance = Math.abs(movingPoint - targetPoint);
        bestVerticalDistance = distance;
        if (distance < bestVerticalDistance) {
          const offsets = [0, moving.width / 2, moving.width];

          x = targetPoint - offsets[movingIndex];
          verticalGuide = targetPoint;
        }
      });
    });

    movingPointsY.forEach((movingPoint, movingIndex) => {
      targetPointsY.forEach((targetPoint) => {
        const distance = Math.abs(movingPoint - targetPoint);
        bestHorizontalDistance = distance;
        if (distance < bestHorizontalDistance) {
          const offsets = [0, moving.height / 2, moving.height];

          y = targetPoint - offsets[movingIndex];
          horizontalGuide = targetPoint;
        }
      });
    });
  }

  return {
    x,
    y,
    verticalGuide,
    horizontalGuide,
  };
}
