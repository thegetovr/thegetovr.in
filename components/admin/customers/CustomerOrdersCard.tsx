import CustomerOrderRowActions from "./CustomerOrderRowActions";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import type { Order } from "@/types/order";
import Link from "next/link";
type CustomerOrdersCardProps = {
  orders: Order[];
};

export default function CustomerOrdersCard({
  orders,
}: CustomerOrdersCardProps) {
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-lg font-semibold text-white">Orders</h2>

      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr className="text-left text-sm text-zinc-400">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.orderNumber} className="border-t border-zinc-800">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.orderNumber}`}
                    className="font-medium text-white transition hover:text-zinc-300 hover:underline"
                  >
                    {order.orderNumber}
                  </Link>
                </td>

                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>

                <td className="px-4 py-3 text-zinc-300">₹{order.total}</td>

                <td className="px-4 py-3 text-zinc-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <CustomerOrderRowActions orderNumber={order.orderNumber} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
