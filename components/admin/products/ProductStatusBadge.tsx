import { ProductStatus } from "@/types/product";

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

const STATUS_CONFIG: Record<
  ProductStatus,
  {
    label: string;
    className: string;
  }
> = {
  active: {
    label: "Live",
    className:
      "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
  },
  draft: {
    label: "Hidden",
    className:
      "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20",
  },
  archived: {
    label: "Archived",
    className:
      "bg-zinc-500/10 text-zinc-400 ring-1 ring-inset ring-zinc-500/20",
  },
};

export default function ProductStatusBadge({
  status,
}: ProductStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}