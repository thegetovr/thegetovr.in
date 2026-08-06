type CouponStatusBadgeProps = {
  status: "active" | "inactive";
};

const statusStyles = {
  active:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  inactive:
    "border-zinc-700 bg-zinc-800 text-zinc-400",
};

export default function CouponStatusBadge({
  status,
}: CouponStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}