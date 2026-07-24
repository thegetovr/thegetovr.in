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

      clearCustomer: () =>
        set({
          customer: initialCustomer,
          isValid: false,
          isSubmitting: false,
        }),
    }),
    {
      name: "thegetovr-checkout",
    }
  )
);