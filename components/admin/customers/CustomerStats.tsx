type CustomerStatsProps = {
  totalCustomers: number;
  activeCustomers: number;
  totalRevenue: number;
};

export default function CustomerStats({
  totalCustomers,
  activeCustomers,
  totalRevenue,
}: CustomerStatsProps) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <p className="text-sm text-zinc-400">
          Total Customers
        </p>

        <p className="mt-2 text-3xl font-bold text-white">
          {totalCustomers}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <p className="text-sm text-zinc-400">
          Active Customers
        </p>

        <p className="mt-2 text-3xl font-bold text-emerald-400">
          {activeCustomers}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <p className="text-sm text-zinc-400">
          Total Revenue
        </p>

        <p className="mt-2 text-3xl font-bold text-white">
          ₹{totalRevenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}