import Link from "next/link";

import StatusBadge from "./StatusBadge";

import { formatCurrency, formatDate } from "@/lib/format";

import type { Order } from "@/types/order";

type OrdersTableProps = {
  orders: Order[];
};

const tableGrid =
  "grid min-w-[950px] grid-cols-[2fr_2fr_1.2fr_1fr_1.2fr_0.8fr] items-center";

export default function OrdersTable({
  orders,
}: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-8 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-2xl">
          📦
        </div>

        <h3 className="text-lg font-semibold text-white">
          No orders found
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          Try changing your search or resetting the current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <div
        className={`${tableGrid} border-b border-zinc-800 bg-zinc-900 px-6 py-4 text-sm font-medium text-zinc-400`}
      >
        <div>Order</div>
        <div>Customer</div>
        <div>Status</div>
        <div>Total</div>
        <div>Date</div>
        <div>Actions</div>
      </div>

      {orders.map((order) => (
        <div
          key={order.orderNumber}
          className={`${tableGrid} border-b border-zinc-800 px-6 py-4 last:border-b-0`}
        >
          <div>
            <p className="font-semibold text-white">
              {order.orderNumber}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              #{order.orderNumber.slice(-4)}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-200">
              {order.customer.firstName}{" "}
              {order.customer.lastName}
            </p>
          </div>

          <div>
            <StatusBadge status={order.status} />
          </div>

          <div>
            <p className="font-medium text-white">
              {formatCurrency(order.total)}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              {formatDate(order.createdAt)}
            </p>
          </div>

          <div>
            <Link
              href={`/admin/orders/${order.orderNumber}`}
              className="inline-flex rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}