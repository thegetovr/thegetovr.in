import {
  STATUS_COLORS,
} from "@/constants/orderStatuses";

import type { OrderStatus } from "@/types/order";

type StatusBadgeProps = {
  status: OrderStatus;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const label = status
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[status]}`}
    >
      {label}
    </span>
  );
}