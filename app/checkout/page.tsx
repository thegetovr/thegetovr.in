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
      <main className="min-h-screen bg-(--color-page) py-10 text-(--color-text-primary)">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-10 text-4xl font-bold tracking-tight">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <CustomerAddress />
            <OrderSummary />
          </div>
        </div>
      </main>
    </FormProvider>
  );
}
