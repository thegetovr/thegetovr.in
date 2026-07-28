
import orders from "@/data/orders.json";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    orderNumber: string;
  }>;
}

export default async function AdminOrderDetailsPage({ params }: PageProps) {
  const { orderNumber } = await params;

  const order = orders.find((o) => o.orderNumber === orderNumber);

  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900"
        >
          ← Back to Orders
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Order {order.orderNumber}
        </h1>

        <p className="mt-2 text-zinc-400">Customer order details.</p>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-zinc-500">Customer</p>

            <p className="mt-1 font-medium text-white">
              {order.customer.firstName} {order.customer.lastName}
            </p>

            <p className="text-zinc-400">{order.customer.email}</p>

            <p className="text-zinc-400">{order.customer.phone}</p>
          </div>

          <div>
            <p className="text-zinc-500">Status</p>

            <p className="mt-1 inline-flex rounded-full border border-zinc-700 px-3 py-1 text-white">
              {order.status}
            </p>
          </div>

          <div>
            <p className="text-zinc-500">Total</p>

            <p className="mt-1 text-xl font-semibold text-white">
              ₹{order.total}
            </p>
          </div>

          <div>
            <p className="text-zinc-500">Shipping Address</p>

            <div className="mt-1 space-y-1 text-white">
              <p>{order.customer.address}</p>
              <p>
                {order.customer.city}, {order.customer.state}
              </p>
              <p>{order.customer.pincode}</p>
            </div>
          </div>

          <div className="col-span-2">
            <p className="mb-3 text-zinc-500">Order Items</p>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{item.product}</p>

                      <p className="text-sm text-zinc-400">
                        {item.color.toUpperCase()} • Size {item.size}
                      </p>
                    </div>

                    <p className="text-zinc-300">Qty {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
