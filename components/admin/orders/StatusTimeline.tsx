import { ORDER_STATUSES } from "@/constants/orderStatuses";

import type { StatusHistoryEntry } from "@/types/order";

type StatusTimelineProps = {
  history?: StatusHistoryEntry[];
};

function getStatusLabel(status: string) {
  return (
    ORDER_STATUSES.find(
      (item) => item.value === status,
    )?.label ?? status
  );
}

export default function StatusTimeline({
  history = [],
}: StatusTimelineProps) {
  if (history.length === 0) {
    return null;
  }

  const sortedHistory = [...history].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime(),
  );

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Status Timeline
      </h2>

      <div className="space-y-4">
        {sortedHistory.map((entry, index) => (
          <div
            key={`${entry.status}-${entry.updatedAt}-${index}`}
            className="flex items-start gap-4"
          >
            <div className="mt-2 h-2.5 w-2.5 rounded-full bg-white" />

            <div className="min-w-0 flex-1">
              <p className="font-medium text-white">
                {getStatusLabel(entry.status)}
              </p>

              <p className="mt-1 text-sm text-zinc-400">
  {new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(entry.updatedAt))}
</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}