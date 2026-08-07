type OrderStatusCardProps = {
  title: string;
  count: number;
};

export default function OrderStatusCard({
  title,
  count,
}: OrderStatusCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-semibold text-white">
        {count}
      </p>
    </div>
  );
}