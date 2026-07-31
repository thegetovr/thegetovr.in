import Link from "next/link";

import StatusBadge from "@/components/admin/orders/StatusBadge";

import {
  formatCurrency,
  formatDate,
} from "@/lib/format";

import type { OrderStatus } from "@/types/order";

type RecentOrderItemProps = {
  orderNumber: string;
  customerName: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
};

export default function RecentOrderItem({
  orderNumber,
  customerName,
  status,
  total,
  createdAt,
}: RecentOrderItemProps) {
  return (
    <Link
      href={`/admin/orders/${orderNumber}`}
      className="block rounded-xl px-4 py-3 transition-all duration-200 hover:bg-zinc-800"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-semibold text-white">
            {orderNumber}
          </p>

          <p className="mt-1 truncate text-sm text-zinc-400">
            {customerName}
          </p>

          <p className="mt-2 text-xs text-zinc-500">
            {formatDate(createdAt)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="font-semibold text-white">
            {formatCurrency(total)}
          </p>

          <StatusBadge status={status} />
        </div>
      </div>
    </Link>
  );
}