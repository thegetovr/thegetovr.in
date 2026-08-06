import Link from "next/link";

type CouponRowActionsProps = {
  couponId: string;
};

export default function CouponRowActions({
  couponId,
}: CouponRowActionsProps) {
  return (
    <Link
      href={`/admin/coupons/${couponId}`}
      className="inline-flex rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
    >
      View
    </Link>
  );
}