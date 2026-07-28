"use client";
import { getOrders } from "@/lib/orderService";
import Link from "next/link";

export default function AdminOrdersPage() {
  const orderList = getOrders();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Orders</h1>

        <p className="mt-2 text-zinc-400">
          Manage customer orders and update their production status.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">All Orders</h2>

          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
            {orderList.length} Orders
          </span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <div className="grid grid-cols-6 border-b border-zinc-800 bg-zinc-900 px-6 py-4 text-sm font-medium text-zinc-400">
            <div>Order</div>
            <div>Customer</div>
            <div>Status</div>
            <div>Total</div>
            <div>Date</div>
            <div>Actions</div>
          </div>

          {orderList.map((order) => (
            <div
              key={order.orderNumber}
              className="grid grid-cols-6 items-center border-b border-zinc-800 px-6 py-4 last:border-b-0"
            >
              <div>
                <div>
                  <p className="font-semibold text-white">
                    {order.orderNumber}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    #{order.orderNumber.slice(-4)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-zinc-200">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
              </div>

              <div>
                <p className="inline-flex rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300">
                  {order.status}
                </p>
              </div>

              <div>
                <p className="font-medium text-white">₹{order.total}</p>
              </div>

              <div>
                <p className="text-sm text-zinc-400">
                  {new Date(order.createdAt).toLocaleDateString()}
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
        
      </section>
    </main>
  );
}
