import { ORDER_STATUS } from "@/lib/order-status";

interface OrderProgressBarProps {
  status: string;
}

export default function OrderProgressBar({ status }: OrderProgressBarProps) {
  const statusInfo =
    ORDER_STATUS[status as keyof typeof ORDER_STATUS] ?? ORDER_STATUS.pending;

  const progress = statusInfo.progress;

  return (
    <div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-linear-to-r from-white via-zinc-200 to-zinc-100 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 border-t border-zinc-800 pt-6">
       <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
  Estimated Delivery
</p>

        <p className="mt-2 text-xl font-semibold text-white">30 July 2026</p>
      </div>
    </div>
  );
}
