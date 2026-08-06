import { notFound } from "next/navigation";
import CouponActionsCard from "@/components/admin/coupons/CouponActionsCard";
import CouponDetailsCard from "@/components/admin/coupons/CouponDetailsCard";
import { getCoupon } from "@/lib/couponService";
import Link from "next/link";
interface AdminCouponDetailsPageProps {
  params: Promise<{
    couponId: string;
  }>;
}

export default async function AdminCouponDetailsPage({
  params,
}: AdminCouponDetailsPageProps) {
  const { couponId } = await params;

  const coupon = await getCoupon(couponId);

  if (!coupon) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6">
        <Link
          href="/admin/coupons"
          className="inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
        >
          ← Back to Coupons
        </Link>
      </div>
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">{coupon.code}</h2>

            <p className="mt-1 text-sm text-zinc-400">Coupon Details</p>
          </div>

          <Link
            href={`/admin/coupons/${coupon.id}/edit`}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Edit Coupon
          </Link>
        </div>
        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <CouponDetailsCard coupon={coupon} />
          </div>

          <CouponActionsCard couponId={coupon.id} />
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: "Coupon Details | The Getovr Admin",
};
