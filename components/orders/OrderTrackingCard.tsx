import OrderHeader from "./OrderHeader";
import OrderProgressBar from "./OrderProgressBar";
import OrderTimeline from "./OrderTimeline";
import { ORDER_STATUS } from "@/lib/order-status";

interface OrderTrackingCardProps {
  orderNumber: string;
  status: string;
  createdAt: string;
}

export default function OrderTrackingCard({
  orderNumber,
  status,
  createdAt,
}: OrderTrackingCardProps) {
  const statusInfo =
    ORDER_STATUS[status as keyof typeof ORDER_STATUS] ?? ORDER_STATUS.pending;

  return (
    <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden">
      <div className="p-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            Current Status
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {statusInfo.label}
          </h2>

          <p className="mt-3 max-w-xl text-zinc-400">
            {statusInfo.description}
          </p>
          <div className="mt-8">
            <OrderProgressBar status={status} />
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <OrderHeader
            orderNumber={orderNumber}
            status={status}
            createdAt={createdAt}
          />
        </div>
      </div>

      <div className="border-t border-zinc-800 p-8">
        <OrderTimeline status={status} />
      </div>
    </section>
  );
}
