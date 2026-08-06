import Link from "next/link";
import CouponForm from "@/components/admin/coupons/CouponForm";
export default function NewCouponPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Create Coupon
          </h1>

          <p className="mt-2 text-zinc-400">
            Create a new discount coupon.
          </p>
        </div>

        <Link
          href="/admin/coupons"
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
        >
          Back
        </Link>
      </div>
      <CouponForm mode="create" />
    </main>
  );
}