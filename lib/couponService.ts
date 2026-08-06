import { connectToDatabase } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

import {
  Coupon as CouponType,
  CouponStatus,
  CouponType as DiscountType,
} from "@/types/coupon";

export interface CouponFilters {
  search?: string;
  status?: CouponStatus | "";
  type?: DiscountType | "";
}

export async function getCoupons(
  filters: CouponFilters = {},
): Promise<CouponType[]> {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.search) {
    const search = filters.search.trim();

    query.$or = [
      {
        code: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const coupons = await Coupon.find(query).lean();

  return coupons.map((coupon) => ({
    id: String(coupon._id),
    code: coupon.code,
    description: coupon.description,
    type: coupon.type,
    value: coupon.value,
    minimumOrderValue: coupon.minimumOrderValue,
    usageLimit: coupon.usageLimit,
    timesUsed: coupon.timesUsed,
    expiresAt: coupon.expiresAt.toISOString(),
    status: coupon.status,
  }));
}

export async function getCoupon(
  id: string,
): Promise<CouponType | null> {
  await connectToDatabase();

  const coupon = await Coupon.findById(id).lean();

  if (!coupon) {
    return null;
  }

  return {
    id: String(coupon._id),
    code: coupon.code,
    description: coupon.description,
    type: coupon.type,
    value: coupon.value,
    minimumOrderValue: coupon.minimumOrderValue,
    usageLimit: coupon.usageLimit,
    timesUsed: coupon.timesUsed,
    expiresAt: coupon.expiresAt.toISOString(),
    status: coupon.status,
  };
}