"use client";
import initialOrders from "@/data/orders.json";
import { useState } from "react";

export default function AdminOrdersPage() {
  const [orderList, setOrderList] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<
    (typeof orderList)[number] | null
  >(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleStatusUpdate = () => {
    if (!selectedOrder) return;

    const updatedOrders = orderList.map((order) =>
      order.id === selectedOrder.id
        ? { ...order, status: selectedStatus }
        : order,
    );

    setOrderList(updatedOrders);

    const updatedOrder = updatedOrders.find(
      (order) => order.id === selectedOrder.id,
    );

    if (updatedOrder) {
      setSelectedOrder(updatedOrder);
    }
  };
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
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setSelectedStatus(order.status);
                  }}
                  className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedOrder && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-lg font-semibold text-white">Selected Order</h3>
            <div className="mt-5 flex items-center gap-4">
            
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white outline-none"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="processing">Processing</option>
                <option value="printing">Printing</option>
                <option value="quality-check">Quality Check</option>
                <option value="packaging">Packaging</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button
                onClick={handleStatusUpdate}
                className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Update Status
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-zinc-500">Order Number</p>
                <p className="mt-1 font-medium text-white">
                  {selectedOrder.orderNumber}
                </p>
              </div>

              <div>
                <p className="text-zinc-500">Customer</p>

                <p className="mt-1 font-medium text-white">
                  {selectedOrder.customer.firstName}{" "}
                  {selectedOrder.customer.lastName}
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  {selectedOrder.customer.email}
                </p>

                <p className="text-sm text-zinc-400">
                  {selectedOrder.customer.phone}
                </p>
              </div>
              <div>
                <p className="text-zinc-500">Total</p>
                <p className="mt-1 font-medium text-white">
                  ₹{selectedOrder.total}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-zinc-500">Shipping Address</p>

                <div className="mt-2 space-y-1 text-sm text-white">
                  <p>{selectedOrder.customer.address}</p>
                  <p>
                    {selectedOrder.customer.city},{" "}
                    {selectedOrder.customer.state}
                  </p>
                  <p>{selectedOrder.customer.pincode}</p>
                </div>
              </div>

              <div className="col-span-2">
                <p className="text-zinc-500">Order Items</p>

                <div className="mt-2 space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">
                            {item.product}
                          </p>

                          <p className="mt-1 text-sm text-zinc-400">
                            {item.color.toUpperCase()} • Size {item.size}
                          </p>
                        </div>

                        <p className="text-sm text-zinc-300">
                          Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
