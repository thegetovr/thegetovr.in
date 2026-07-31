import type { OrderStatus } from "@/types/order";

export const ORDER_STATUSES: {
  value: OrderStatus;
  label: string;
}[] = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "processing", label: "Processing" },
  { value: "printing", label: "Printing" },
  { value: "quality-check", label: "Quality Check" },
  { value: "packaging", label: "Packaging" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  paid:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  processing:
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  printing:
    "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "quality-check":
    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  packaging:
    "bg-orange-500/10 text-orange-400 border-orange-500/20",
  shipped:
    "bg-sky-500/10 text-sky-400 border-sky-500/20",
  delivered:
    "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

export const ORDER_STATUS_VALUES = ORDER_STATUSES.map(
  (status) => status.value,
);

export function isValidOrderStatus(
  value: string,
): value is OrderStatus {
  return ORDER_STATUS_VALUES.includes(
    value as OrderStatus,
  );
}