interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    className:
      "border-yellow-500/30 bg-yellow-500/15 text-yellow-400",
  },
  confirmed: {
    label: "Confirmed",
    className:
      "border-blue-500/30 bg-blue-500/15 text-blue-400",
  },
  printing: {
    label: "Printing",
    className:
      "border-purple-500/30 bg-purple-500/15 text-purple-400",
  },
  packed: {
    label: "Packed",
    className:
      "border-orange-500/30 bg-orange-500/15 text-orange-400",
  },
  shipped: {
    label: "Shipped",
    className:
      "border-cyan-500/30 bg-cyan-500/15 text-cyan-400",
  },
  delivered: {
    label: "Delivered",
    className:
      "border-green-500/30 bg-green-500/15 text-green-400",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "border-red-500/30 bg-red-500/15 text-red-400",
  },
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const config =
    statusConfig[status.toLowerCase()] ?? {
      label: status,
      className:
        "border-zinc-700 bg-zinc-800 text-zinc-300",
    };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}