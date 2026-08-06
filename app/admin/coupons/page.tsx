import CouponStats from "@/components/admin/coupons/CouponStats";
import CouponTable from "@/components/admin/coupons/CouponTable";
import CouponToolbar from "@/components/admin/coupons/CouponToolbar";
import { getCoupons } from "@/lib/couponService";

type AdminCouponsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    type?: string;
  }>;
};

export default async function AdminCouponsPage({
  searchParams,
}: AdminCouponsPageProps) {
  const { search = "", status = "", type = "" } = await searchParams;

  const coupons = await getCoupons({
    search,
    status: status === "active" || status === "inactive" ? status : "",
    type: type === "percentage" || type === "flat" ? type : "",
  });
  const activeCoupons = coupons.filter(
    (coupon) => coupon.status === "active",
  ).length;

  const expiredCoupons = coupons.filter(
    (coupon) => new Date(coupon.expiresAt) < new Date(),
  ).length;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Coupons</h2>

            <p className="mt-1 text-sm text-zinc-400">
              View and manage your coupons.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
              {coupons.length} Coupons
            </span>

            <a
              href="/admin/coupons/new"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              + New Coupon
            </a>
          </div>
        </div>
        <CouponStats
          totalCoupons={coupons.length}
          activeCoupons={activeCoupons}
          expiredCoupons={expiredCoupons}
        />
        <CouponToolbar search={search} status={status} type={type} />
        <CouponTable coupons={coupons} />
      </section>
    </main>
  );
}

export const metadata = {
  title: "Coupons | The Getovr Admin",
};
