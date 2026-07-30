import type { RecentActivity } from "@/types/admin";
import { OrdersIcon } from "@/components/admin/icons";

type RecentActivityItemProps = {
  activity: RecentActivity;
};

export default function RecentActivityItem({
  activity,
}: RecentActivityItemProps) {
  return (
    <div className="flex items-center gap-4 border-b border-zinc-800 px-6 py-4 last:border-b-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400">
        <OrdersIcon size={16} strokeWidth={2} />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-white">{activity.title}</h3>

        <p className="mt-1 text-sm text-zinc-400">{activity.description}</p>

        <p className="mt-2 text-xs text-zinc-500">{activity.createdAt}</p>
      </div>
    </div>
  );
}
