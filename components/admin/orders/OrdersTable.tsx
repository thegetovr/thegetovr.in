import Link from "next/link";

import StatusBadge from "./StatusBadge";

import type { Order } from "@/types/order";

type OrdersTableProps = {
  orders: Order[];
};

export default function OrdersTable({
  orders,
}: OrdersTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <div className="grid grid-cols-6 border-b border-zinc-800 bg-zinc-900 px-6 py-4 text-sm font-medium text-zinc-400">
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
          className="grid grid-cols-6 items-center border-b border-zinc-800 px-6 py-4 last:border-b-0"
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
              ₹{order.total}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              {new Date(order.createdAt).toLocaleDateString("en-IN")}
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