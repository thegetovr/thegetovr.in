import OrderHeader from "./OrderHeader";
import OrderProgressBar from "./OrderProgressBar";
import OrderTimeline from "./OrderTimeline";
import { ORDER_STATUS } from "@/lib/order-status";

interface StatusHistoryItem {
  status: string;
  updatedAt: string;
}

interface OrderTrackingCardProps {
  orderNumber: string;
  status: string;
  createdAt: string;
  statusHistory?: StatusHistoryItem[];
}

export default function OrderTrackingCard({ status }: OrderTrackingCardProps) {
  const statusInfo =
    ORDER_STATUS[status as keyof typeof ORDER_STATUS] ?? ORDER_STATUS.pending;

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="mt-2 text-2xl font-semibold text-black">
            {statusInfo.label}
          </h2>

          <p className="mt-2 max-w-xl text-sm text-gray-500">
            {statusInfo.description}
          </p>
          <p className="mt-2 max-w-xl text-sm text-gray-500">
            Expected Delivery in 3-5 business days.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 p-6">
        <OrderTimeline status={status} />
      </div>
    </section>
  );
}
