type StatusBadgeProps = {
  status: string;
};

const statusStyles: Record<string, string> = {
  pending:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  paid:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  processing:
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  printing:
    "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "quality-check":
    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  packaging:
    "bg-orange-500/10 text-orange-400 border-orange-500/20",
  shipped:
    "bg-sky-500/10 text-sky-400 border-sky-500/20",
  delivered:
    "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const style =
    statusStyles[status] ??
    "bg-zinc-700 text-zinc-300 border-zinc-600";

  const label = status
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${style}`}
    >
      {label}
    </span>
  );
}