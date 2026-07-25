import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface CheckoutStore {
  customer: CheckoutData;
  coupon: string;
  discount: number;

  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;

  isValid: boolean;
  isSubmitting: boolean;

  setCustomer: (customer: CheckoutData) => void;
  setIsValid: (value: boolean) => void;
  setIsSubmitting: (value: boolean) => void;

  clearCustomer: () => void;
}

const initialCustomer: CheckoutData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      customer: initialCustomer,
      coupon: "",
      discount: 0,

      isValid: false,
      isSubmitting: false,

      setCustomer: (customer) =>
        set({
          customer,
        }),

      setIsValid: (value) =>
        set({
          isValid: value,
        }),

      setIsSubmitting: (value) =>
        set({
          isSubmitting: value,
        }),
      applyCoupon: (code, discount) =>
        set({
          coupon: code,
          discount,
        }),

      removeCoupon: () =>
        set({
          coupon: "",
          discount: 0,
        }),

      clearCustomer: () =>
        set({
          customer: initialCustomer,
          coupon: "",
          discount: 0,
          isValid: false,
          isSubmitting: false,
        }),
    }),
    {
      name: "thegetovr-checkout",
    },
  ),
);
