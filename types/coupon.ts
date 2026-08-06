export type CouponType = "percentage" | "flat";

export type CouponStatus = "active" | "inactive";

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: CouponType;
  value: number;
  minimumOrderValue: number;
  usageLimit: number;
  timesUsed: number;
  expiresAt: string;
  status: CouponStatus;
}