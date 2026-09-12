"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomerAddress from "@/components/checkout/CustomerAddress";
import OrderSummary from "@/components/checkout/OrderSummary";

import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/lib/validation/checkoutSchema";

export default function CheckoutPage() {
  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-(--color-page) py-12 text-(--color-text-primary)">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.45em] text-(--color-text-secondary)">
              Complete your order
            </p>

            <h1 className="mt-4 font-(--font-editorial) text-5xl font-normal leading-tight">
              Checkout
            </h1>

            <p className="mt-4 text-base leading-7 text-(--color-text-secondary)">
              Confirm your delivery details and review your order before
              placing it.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
            <CustomerAddress />
            <OrderSummary />
          </div>
        </div>
      </main>
    </FormProvider>
  );
}