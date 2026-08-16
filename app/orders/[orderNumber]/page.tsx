import { getOrderByNumber } from "@/lib/orderService";
import CustomerCard from "@/components/orders/CustomerCard";
import OrderItems from "@/components/orders/OrderItems";
import PaymentSummary from "@/components/orders/PaymentSummary";
import ShippingCard from "@/components/orders/ShippingCard";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderTimeline from "@/components/orders/OrderTimeline";
import { ORDER_STATUS } from "@/lib/order-status";

type OrderPageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

export default async function OrderDetailsPage({ params }: OrderPageProps) {
  const { orderNumber } = await params;

  const order = await getOrderByNumber(orderNumber);

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold">Order Not Found</h1>
      </main>
    );
  }

  const statusInfo =
    ORDER_STATUS[order.status as keyof typeof ORDER_STATUS] ??
    ORDER_STATUS.pending;

  return (
    <main className="min-h-screen bg-white px-8 py-16 text-black">
      <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black">Order Details</h1>

          <p className="mt-2 text-gray-500">Track and review your purchase.</p>
        </div>

        {/* Order Number - FULL WIDTH */}
        <div className="mb-8">
          <OrderHeader
            orderNumber={order.orderNumber}
            createdAt={order.createdAt}
          />
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="space-y-8 lg:col-span-2">
            {/* Confirmed / Current Status */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-black">
                {statusInfo.label}
              </h2>

              <p className="mt-2 max-w-xl text-sm text-gray-500">
                {statusInfo.description}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Expected Delivery in 3-5 business days.
              </p>
            </section>

            {/* Order Items */}
            <OrderItems items={order.items} />

            {/* Order Timeline */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <OrderTimeline status={order.status} />
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* Customer */}
            <CustomerCard customer={order.customer} />

            {/* Delivery Address */}
            <ShippingCard customer={order.customer} />

            {/* Payment Summary */}
            <PaymentSummary
              subtotal={order.subtotal}
              discount={order.discount}
              total={order.total}
              coupon={order.coupon}
            />
            <a
              href={`/api/orders/${order.orderNumber}/invoice`}
              download
              className="flex w-full items-center justify-center rounded-xl border border-zinc-400 
              bg-[#eee3d5] px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-[#e6d8c6]"
            >
              Download Invoice
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
