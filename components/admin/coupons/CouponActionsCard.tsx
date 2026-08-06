import Link from "next/link";

interface CouponActionsCardProps {
  couponId: string;
}

export default function CouponActionsCard({
  couponId,
}: CouponActionsCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white">
        Actions
      </h2>

      <div className="mt-6 space-y-3">
        <Link
          href={`/admin/coupons/${couponId}/edit`}
          className="block w-full rounded-lg bg-white px-4 py-2.5 text-center text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Edit Coupon
        </Link>
      </div>
    </div>
  );
}