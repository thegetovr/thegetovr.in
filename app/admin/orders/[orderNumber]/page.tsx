import Link from "next/link";
import { notFound } from "next/navigation";
import StatusTimeline from "@/components/admin/orders/StatusTimeline";
import AdminNotesCard from "@/components/admin/orders/AdminNotesCard";
import DesignPreviewCard from "@/components/admin/orders/DesignPreviewCard";

import CustomerDetailsCard from "@/components/admin/orders/CustomerDetailsCard";
import OrderStatusCard from "@/components/admin/orders/OrderStatusCard";

import { formatCurrency, formatDate } from "@/lib/format";
import { getOrderByNumber } from "@/lib/orderService";

interface PageProps {
  params: Promise<{
    orderNumber: string;
  }>;
}

export default async function AdminOrderDetailsPage({ params }: PageProps) {
  const { orderNumber } = await params;

  const order = await getOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-12">
      <div>
        <Link
          href="/admin/orders"
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900"
        >
          ← Back to Orders
        </Link>

        <h1 className="text-3xl font-bold text-white">{order.orderNumber}</h1>

        <p className="mt-2 text-zinc-400">
          Order placed on {formatDate(order.createdAt)}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-5 text-lg font-semibold text-white">
              Order Items
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => {
                const isReadyMade = "name" in item;

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold capitalize text-white">
                          {isReadyMade ? item.name : item.product}
                        </h3>

                        <p className="mt-2 text-sm text-zinc-400">
                          {isReadyMade ? (
                            "Ready-Made Product"
                          ) : (
                            <>
                              {item.color.toUpperCase()} • Size {item.size} •{" "}
                              {item.printSide}
                            </>
                          )}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          Qty {item.quantity}
                        </p>

                        <p className="mt-2 text-zinc-400">
                          {formatCurrency(item.totalPrice)}
                        </p>
                      </div>
                    </div>

                    {isReadyMade ? (
                      <div className="mt-6 rounded-xl border border-zinc-800 bg-black/30 p-4">
                        <p className="text-sm font-medium text-zinc-400">
                          Ready-Made Product
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          No custom design attached.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-6">
                        <DesignPreviewCard
                          product={item.product}
                          productColor={item.color}
                          frontElements={item.frontElements}
                          backElements={item.backElements}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <OrderStatusCard
            orderNumber={order.orderNumber}
            currentStatus={order.status}
          />

          <StatusTimeline history={order.statusHistory} />

          <CustomerDetailsCard customer={order.customer} />

          <AdminNotesCard
            orderNumber={order.orderNumber}
            initialNotes={order.adminNotes ?? ""}
          />

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-5 text-lg font-semibold text-white">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-white">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">Discount</span>
                <span className="text-white">
                  {formatCurrency(order.discount)}
                </span>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <div className="flex justify-between">
                  <span className="font-medium text-white">Total</span>

                  <span className="font-semibold text-white">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
