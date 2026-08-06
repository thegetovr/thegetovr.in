import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().trim().min(1, "Coupon code is required"),

  description: z.string().trim(),

  type: z.enum([
    "percentage",
    "flat",
  ]),

  value: z.coerce
    .number()
    .min(0, "Discount value cannot be negative"),

  minimumOrderValue: z.coerce
    .number()
    .min(0, "Minimum order value cannot be negative"),

  usageLimit: z.coerce
    .number()
    .int("Usage limit must be a whole number")
    .min(0, "Usage limit cannot be negative"),

  expiresAt: z.string().min(1, "Expiry date is required"),

  status: z.enum([
    "active",
    "inactive",
  ]),
});

export type CouponInput = z.infer<typeof couponSchema>;