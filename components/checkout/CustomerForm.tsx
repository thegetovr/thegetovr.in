"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import { useCheckoutStore } from "@/stores/checkoutStore";
import type { CheckoutFormData } from "@/lib/validation/checkoutSchema";
export default function CustomerForm() {
  const { customer, setCustomer, setIsValid } = useCheckoutStore();

 const {
  register,
  watch,
  reset,
  formState: { errors, isValid },
} = useFormContext<CheckoutFormData>();

  useEffect(() => {
    const subscription = watch((value) => {
      setCustomer({
        firstName: value.firstName ?? "",
        lastName: value.lastName ?? "",
        email: value.email ?? "",
        phone: value.phone ?? "",
        address: value.address ?? "",
        city: value.city ?? "",
        state: value.state ?? "",
        pincode: value.pincode ?? "",
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, setCustomer]);

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid, setIsValid]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
      <h2 className="mb-6 text-2xl font-semibold">Customer Details</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="First Name"
          required
          placeholder="John"
          registration={register("firstName")}
          error={errors.firstName?.message}
        />

        <FormField
          label="Last Name"
          required
          placeholder="Doe"
          registration={register("lastName")}
          error={errors.lastName?.message}
        />

        <FormField
          label="Email"
          type="email"
          required
          placeholder="john@example.com"
          registration={register("email")}
          error={errors.email?.message}
        />

        <FormField
          label="Phone"
          required
          placeholder="9876543210"
          registration={register("phone")}
          error={errors.phone?.message}
        />
      </div>

      <div className="mt-4">
        <FormField
          label="Address"
          required
          placeholder="House No, Street, Area"
          registration={register("address")}
          error={errors.address?.message}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <FormField
          label="City"
          required
          placeholder="Jaipur"
          registration={register("city")}
          error={errors.city?.message}
        />

        <FormField
          label="State"
          required
          placeholder="Rajasthan"
          registration={register("state")}
          error={errors.state?.message}
        />

        <FormField
          label="Pincode"
          required
          placeholder="302001"
          registration={register("pincode")}
          error={errors.pincode?.message}
        />
      </div>
    </div>
  );
}
