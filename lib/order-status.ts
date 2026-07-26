export const ORDER_STATUS = {
  pending: {
    label: "Order Confirmed",
    description:
      "We've received your order and it's queued for production.",
    timelineStep: "Placed",
    progress: 14,
  },

  processing: {
    label: "In Production",
    description:
      "Your apparel is currently being printed with care.",
    timelineStep: "Printing",
    progress: 29,
  },

  quality_check: {
    label: "Quality Check",
    description:
      "We're carefully inspecting your order before packing.",
    timelineStep: "Quality Check",
    progress: 43,
  },

  packed: {
    label: "Packed",
    description:
      "Your order has been packed and is ready for shipment.",
    timelineStep: "Packed",
    progress: 57,
  },

  shipped: {
    label: "On the Way",
    description:
      "Your order is on its way and will arrive soon.",
    timelineStep: "Shipped",
    progress: 86,
  },

  delivered: {
    label: "Delivered",
    description:
      "Your order has been delivered. We hope you love it!",
    timelineStep: "Delivered",
    progress: 100,
  },

  cancelled: {
    label: "Cancelled",
    description:
      "This order has been cancelled.",
    timelineStep: "Cancelled",
    progress: 0,
  },
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS;