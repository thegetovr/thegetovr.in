import CouponRowActions from "./CouponRowActions";
import CouponStatusBadge from "./CouponStatusBadge";

import { formatCurrency, formatDate } from "@/lib/format";
import type { Coupon } from "@/types/coupon";

type CouponTableProps = {
  coupons: Coupon[];
};

const tableGrid =
  "grid min-w-[1100px] grid-cols-[1.5fr_2fr_1fr_1fr_1.3fr_1fr_1fr_0.8fr] items-center";

export default function CouponTable({
  coupons,
}: CouponTableProps) {
  if (coupons.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-8 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-2xl">
          🎟️
        </div>

        <h3 className="text-lg font-semibold text-white">
          No coupons found
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          Create your first coupon to start offering discounts.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <div
        className={`${tableGrid} border-b border-zinc-800 bg-zinc-900 px-6 py-4 text-sm font-medium text-zinc-400`}
      >
        <div>Code</div>
        <div>Description</div>
        <div>Type</div>
        <div>Value</div>
        <div>Usage</div>
        <div>Expires</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      {coupons.map((coupon) => (
        <div
          key={coupon.id}
          className={`${tableGrid} border-b border-zinc-800 px-6 py-4 last:border-b-0`}
        >
          <div className="font-medium text-white">
            {coupon.code}
          </div>

          <div className="text-zinc-300">
            {coupon.description || "—"}
          </div>

          <div className="capitalize text-white">
            {coupon.type}
          </div>

          <div className="text-white">
            {coupon.type === "percentage"
              ? `${coupon.value}%`
              : formatCurrency(coupon.value)}
          </div>

          <div className="text-white">
            {coupon.timesUsed} / {coupon.usageLimit}
          </div>

          <div className="text-zinc-400">
            {formatDate(coupon.expiresAt)}
          </div>

          <div>
            <CouponStatusBadge status={coupon.status} />
          </div>

          <div>
            <CouponRowActions couponId={coupon.id} />
          </div>
        </div>
      ))}
    </div>
  );
}