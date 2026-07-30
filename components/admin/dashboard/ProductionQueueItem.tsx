import Link from "next/link";

type ProductionQueueItemProps = {
  label: string;
  status: string;
  count: number;
};

const statusDot: Record<string, string> = {
  printing: "bg-purple-500",
  "quality-check": "bg-cyan-500",
  packaging: "bg-orange-500",
  shipped: "bg-sky-500",
};

export default function ProductionQueueItem({
  label,
  status,
  count,
}: ProductionQueueItemProps) {
  return (
    <Link
      href={`/admin/orders?status=${status}`}
      className="group flex items-center justify-between border-b border-zinc-800 px-4 py-4 transition-colors last:border-b-0 hover:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      <div className="flex items-center gap-3">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            statusDot[status] ?? "bg-zinc-500"
          }`}
        />

        <span className="text-sm font-medium text-white group-hover:text-zinc-100">
          {label}
        </span>
      </div>

      <span className="min-w-8 rounded-full bg-zinc-800 px-3 py-1 text-center text-sm font-semibold text-white">
        {count}
      </span>
    </Link>
  );
}