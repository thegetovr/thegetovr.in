"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

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
          {/* Header */}
          <motion.div
            className="mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-sm uppercase tracking-[0.45em] text-(--color-text-secondary)">
              Complete your order
            </p>

            <h1 className="mt-4 font-(--font-editorial) text-5xl font-normal leading-tight">
              Checkout
            </h1>

            <p className="mt-4 text-base leading-7 text-(--color-text-secondary)">
              Confirm your delivery details and review your order before placing
              it.
            </p>
          </motion.div>

          {/* Checkout Content */}
          <div className="grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Customer Address */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CustomerAddress />
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <OrderSummary />
            </motion.div>
          </div>
        </div>
      </main>
    </FormProvider>
  );
}
