import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Coupon {
  code: string;
  type: "flat" | "percentage";
  value: number;
}

interface CouponStore {
  coupon: Coupon | null;
  discount: number;

  applyCoupon: (coupon: Coupon, subtotal: number) => void;
  removeCoupon: () => void;
}

export const useCouponStore = create<CouponStore>()(
  persist(
    (set) => ({
      coupon: null,
      discount: 0,

      applyCoupon: (coupon, subtotal) => {
        const discount =
          coupon.type === "flat"
            ? coupon.value
            : Math.round((subtotal * coupon.value) / 100);

        set({
          coupon,
          discount,
        });
      },

      removeCoupon: () =>
        set({
          coupon: null,
          discount: 0,
        }),
    }),
    {
      name: "thegetovr-coupon",
    }
  )
);