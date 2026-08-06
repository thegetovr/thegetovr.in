import { notFound } from "next/navigation";

import CouponForm from "@/components/admin/coupons/CouponForm";
import { getCoupon } from "@/lib/couponService";

interface EditCouponPageProps {
  params: Promise<{
    couponId: string;
  }>;
}

export default async function EditCouponPage({
  params,
}: EditCouponPageProps) {
  const { couponId } = await params;

  const coupon = await getCoupon(couponId);

  if (!coupon) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Edit Coupon
        </h1>

        <p className="mt-2 text-zinc-400">
          Update coupon information.
        </p>
      </div>

      <CouponForm
        mode="edit"
        coupon={coupon}
      />
    </div>
  );
}