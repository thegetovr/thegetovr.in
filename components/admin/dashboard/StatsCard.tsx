type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
};

export default function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2
        className="mt-3 wrap-break-word text-3xl font-bold text-white"
        aria-label={`${title}: ${value || "No data"}`}
      >
        {value || "—"}
      </h2>

      <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
    </div>
  );
}
