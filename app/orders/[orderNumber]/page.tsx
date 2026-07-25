import OrderHeader from "@/components/orders/OrderHeader";
import { getOrderByNumber } from "@/lib/orders";
import CustomerCard from "@/components/orders/CustomerCard";
import OrderItems from "@/components/orders/OrderItems";
import PaymentSummary from "@/components/orders/PaymentSummary";
import ShippingCard from "@/components/orders/ShippingCard";
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

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Order Details</h1>

          <p className="mt-2 text-zinc-400">Track and review your purchase.</p>
        </div>
        <OrderHeader
          orderNumber={order.orderNumber}
          status={order.status}
          createdAt={order.createdAt}
        />

        <div className="mt-8"></div>
        <div className="mt-10">
          <CustomerCard customer={order.customer} />
          <ShippingCard customer={order.customer} />
          <OrderItems items={order.items} />
            <PaymentSummary
              subtotal={order.subtotal}
              discount={order.discount}
              total={order.total}
              coupon={order.coupon}
            />
        </div>
      </div>
    </main>
  );
}
