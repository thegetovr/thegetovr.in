"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomerForm from "@/components/checkout/CustomerForm";
import OrderSummary from "@/components/checkout/OrderSummary";

import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/lib/validation/checkoutSchema";

import { useCheckoutStore } from "@/stores/checkoutStore";

export default function CheckoutPage() {
  const { customer } = useCheckoutStore();

  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: customer,
  });

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-[#0A0A0F] py-10">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-10 text-4xl font-bold text-white">
            Checkout
          </h1>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <CustomerForm />
            <OrderSummary />
          </div>
        </div>
      </main>
    </FormProvider>
  );
}