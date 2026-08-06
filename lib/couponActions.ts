"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";
import { couponSchema } from "@/lib/validation/coupon";

async function parseCouponForm(formData: FormData) {
  return couponSchema.safeParse({
    code: formData.get("code"),
    description: formData.get("description"),
    type: formData.get("type"),
    value: formData.get("value"),
    minimumOrderValue: formData.get("minimumOrderValue"),
    usageLimit: formData.get("usageLimit"),
    expiresAt: formData.get("expiresAt"),
    status: formData.get("status"),
  });
}

export async function createCoupon(formData: FormData) {
  const parsed = await parseCouponForm(formData);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await connectToDatabase();

  const existingCoupon = await Coupon.findOne({
    code: parsed.data.code.toUpperCase(),
  });

  if (existingCoupon) {
    console.error("A coupon with this code already exists.");
    return;
  }

  const coupon = await Coupon.create({
    ...parsed.data,
    code: parsed.data.code.toUpperCase(),
  });

  revalidatePath("/admin/coupons");

  redirect(`/admin/coupons/${coupon.id}`);
}

export async function updateCoupon(
  couponId: string,
  formData: FormData,
) {
  const parsed = await parseCouponForm(formData);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await connectToDatabase();

  const existingCoupon = await Coupon.findOne({
    code: parsed.data.code.toUpperCase(),
    _id: { $ne: couponId },
  });

  if (existingCoupon) {
    console.error("A coupon with this code already exists.");
    return;
  }

  await Coupon.findByIdAndUpdate(couponId, {
    ...parsed.data,
    code: parsed.data.code.toUpperCase(),
  });

  revalidatePath("/admin/coupons");
  revalidatePath(`/admin/coupons/${couponId}`);

  redirect(`/admin/coupons/${couponId}`);
}

export async function deleteCoupon(couponId: string) {
  await connectToDatabase();

  await Coupon.findByIdAndDelete(couponId);

  revalidatePath("/admin/coupons");

  redirect("/admin/coupons");
}