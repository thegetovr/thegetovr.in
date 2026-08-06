import { formatCurrency, formatDate } from "@/lib/format";
import type { Coupon } from "@/types/coupon";

type CouponDetailsCardProps = {
  coupon: Coupon;
};

export default function CouponDetailsCard({
  coupon,
}: CouponDetailsCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Discount Type
        </p>

        <p className="mt-2 text-white capitalize">
          {coupon.type}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Discount Value
        </p>

        <p className="mt-2 text-white">
          {coupon.type === "percentage"
            ? `${coupon.value}%`
            : formatCurrency(coupon.value)}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Status
        </p>

        <p className="mt-2 text-white capitalize">
          {coupon.status}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Minimum Order
        </p>

        <p className="mt-2 text-white">
          {formatCurrency(coupon.minimumOrderValue)}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Usage
        </p>

        <p className="mt-2 text-white">
          {coupon.timesUsed} / {coupon.usageLimit}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Expiry
        </p>

        <p className="mt-2 text-white">
          {formatDate(coupon.expiresAt)}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5 md:col-span-3">
        <p className="text-sm text-zinc-400">
          Description
        </p>

        <p className="mt-2 text-white">
          {coupon.description || "—"}
        </p>
      </div>
    </div>
  );
}