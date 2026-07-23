export const CANVAS = {
  width: 620,
  height: 640,
};

export const PRODUCT_CONFIG = {
  hoodie: {
    mockup: {
      height: 590,
      offsetY: 20,
    },
    printArea: {
      x: 140,
      y: 90,
      width: 340,
      height: 390,
    },
  },

  oversized: {
    mockup: {
      height: 600,
      offsetY: 15,
    },
    printArea: {
      x: 135,
      y: 80,
      width: 350,
      height: 400,
    },
  },

  tshirt: {
    mockup: {
      height: 570,
      offsetY: 25,
    },
    printArea: {
      x: 145,
      y: 85,
      width: 330,
      height: 390,
    },
  },
} as const;
export const SNAP_THRESHOLD = 40;