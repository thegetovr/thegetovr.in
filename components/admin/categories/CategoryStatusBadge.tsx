import { CategoryStatus } from "@/types/category";

interface CategoryStatusBadgeProps {
  status: CategoryStatus;
}

const STATUS_STYLES: Record<CategoryStatus, string> = {
  active:
    "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
  hidden:
    "bg-zinc-500/10 text-zinc-400 ring-1 ring-zinc-500/20",
};

const STATUS_LABELS: Record<CategoryStatus, string> = {
  active: "Live",
  hidden: "Hidden",
};

export default function CategoryStatusBadge({
  status,
}: CategoryStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}