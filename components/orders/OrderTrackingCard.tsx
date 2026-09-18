import OrderHeader from "./OrderHeader";
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

export default function OrderTrackingCard({
  orderNumber,
  status,
  createdAt,
}: OrderTrackingCardProps) {
  const statusInfo =
    ORDER_STATUS[status as keyof typeof ORDER_STATUS] ?? ORDER_STATUS.pending;

  return (
    <section className="overflow-hidden border border-(--color-border) bg-(--color-surface) shadow-(--shadow-subtle)">
      <div className="p-6">
        <div className="mb-8">
          <OrderHeader
            orderNumber={orderNumber}
            createdAt={createdAt}
            status={status}
          />

          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-(--color-text-primary)">
            {statusInfo.label}
          </h2>

          <p className="mt-2 max-w-xl text-sm text-(--color-text-secondary)">
            {statusInfo.description}
          </p>

          <p className="mt-2 max-w-xl text-sm text-(--color-text-secondary)">
            Expected Delivery in 3-5 business days.
          </p>
        </div>
      </div>
    </section>
  );
}