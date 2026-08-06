type CouponStatsProps = {
  totalCoupons: number;
  activeCoupons: number;
  expiredCoupons: number;
};

export default function CouponStats({
  totalCoupons,
  activeCoupons,
  expiredCoupons,
}: CouponStatsProps) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
        <p className="text-sm text-zinc-400">Total Coupons</p>

        <p className="mt-2 text-3xl font-bold text-white">
          {totalCoupons}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
        <p className="text-sm text-zinc-400">Active Coupons</p>

        <p className="mt-2 text-3xl font-bold text-green-400">
          {activeCoupons}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
        <p className="text-sm text-zinc-400">Expired Coupons</p>

        <p className="mt-2 text-3xl font-bold text-red-400">
          {expiredCoupons}
        </p>
      </div>
    </div>
  );
}