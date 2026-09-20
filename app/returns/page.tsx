"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3,
  CreditCard,
  PackageCheck,
  RefreshCcw,
  ShieldAlert,
  X,
} from "lucide-react";

const returnSteps = [
  {
    number: "01",
    title: "Raise a request",
    text: "Contact us with your order number and the reason for the return or replacement.",
  },
  {
    number: "02",
    title: "Request review",
    text: "Our team will review the request and confirm whether the product is eligible.",
  },
  {
    number: "03",
    title: "Send the product",
    text: "If approved, follow the return instructions provided by our support team.",
  },
  {
    number: "04",
    title: "Refund or replacement",
    text: "After the returned product is received and checked, we will process the applicable refund or replacement.",
  },
];

const eligiblePoints = [
  "Product is unused and in its original condition.",
  "Original packaging, tags and accessories are retained where applicable.",
  "Product has not been damaged, altered, washed or misused.",
  "Return request is raised within the applicable return period.",
  "The product is a ready-made item eligible for return.",
];

const nonReturnablePoints = [
  "Custom-designed or personalized products created by the customer.",
  "Products made according to customer-provided designs, text, images or specifications.",
  "Products that have been used, washed, altered or damaged by the customer.",
  "Products returned without required accessories, tags or original packaging where applicable.",
  "Products that show signs of misuse or intentional damage.",
];

export default function ReturnsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f5f1] text-[#151515]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#f7f5f1] text-[#151515]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#9b7b46]/15 blur-[110px]" />
          <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#e8dfd4]/70 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-7 sm:pb-20 lg:px-10 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:text-[#151515]"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </motion.div>

          <div className="mt-16 grid items-end gap-12 lg:grid-cols-[1fr_430px] lg:mt-24">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9b7b46]"
              >
                The GetOvr · Returns & Refunds
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-5 max-w-[850px] font-serif text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.88] tracking-[-0.065em]"
              >
                Returns
                <br />
                <span className="text-zinc-400">& Refunds.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.27,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 max-w-[620px] text-sm leading-7 text-zinc-600 sm:text-[15px] sm:leading-8"
              >
                We want your shopping experience with The GetOvr to be simple
                and transparent. This policy explains when a product can be
                returned, replaced or refunded and how the process works.
              </motion.p>
            </div>

            {/* HERO INFO CARD */}

            <motion.div
              initial={{ opacity: 0, x: 45, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                delay: 0.35,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-[24px] border border-[#ddd5ca] bg-white/70 p-6 backdrop-blur-xl sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Quick overview
                </span>

                <RefreshCcw
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#9b7b46]"
                />
              </div>

              <div className="mt-7 space-y-4">
                <div className="flex items-center justify-between border-b border-[#e5ded5] pb-4">
                  <span className="text-sm text-zinc-500">
                    Ready-made items
                  </span>
                  <span className="text-sm font-medium text-[#151515]">
                    Return eligible
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#e5ded5] pb-4">
                  <span className="text-sm text-zinc-500">Custom items</span>
                  <span className="text-sm font-medium text-[#9b7b46]">
                    Non-returnable
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#e5ded5] pb-4">
                  <span className="text-sm text-zinc-500">Shipping</span>
                  <span className="text-sm font-medium text-[#151515]">
                    ₹85 / Free ₹1,000+
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">Refund method</span>
                  <span className="text-sm font-medium text-[#151515]">
                    Original payment
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              delay: 0.45,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-14 h-px origin-left bg-gradient-to-r from-[#9b7b46]/30 via-[#d8cbbd] to-transparent"
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.55,
              duration: 0.6,
            }}
            className="mt-5 flex flex-wrap items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400"
          >
            <span>Last Updated · 20 September 2026</span>
            <span className="hidden h-px w-6 bg-[#d8cfc3] sm:block" />
            <span>thegetovr.in</span>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="mx-auto max-w-[1250px] px-5 py-14 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        {/* ELIGIBILITY */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9b7b46]">
                01 · Return eligibility
              </p>

              <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
                When can you return?
              </h2>
            </div>

            <p className="max-w-[420px] text-sm leading-7 text-zinc-500">
              Eligible ready-made products may be returned when they meet the
              conditions below.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {eligiblePoints.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-[18px] border border-[#e3ddd5] bg-white p-5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eee7dc] text-[#9b7b46]">
                  <Check size={15} strokeWidth={2} />
                </div>

                <p className="mt-5 text-[13px] leading-6 text-zinc-600">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CUSTOM PRODUCTS */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16 overflow-hidden rounded-[24px] border border-[#d8c8b4] bg-[#f1e9dd]"
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-[#9b7b46] p-7 text-white sm:p-9">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/55">
                  Important
                </span>

                <h2 className="mt-4 max-w-[330px] font-serif text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl">
                  Custom means
                  <br />
                  made for you.
                </h2>
              </div>

              <div className="absolute -bottom-16 -right-10 select-none font-serif text-[180px] leading-none text-white/[0.08]">
                C
              </div>
            </div>

            <div className="p-7 sm:p-9 lg:p-11">
              <p className="max-w-[650px] text-sm leading-7 text-zinc-600">
                Products that you personally customize or design are made
                according to your specifications. Because these products are
                created specifically for you,{" "}
                <strong className="font-semibold text-black">
                  customer-created customized products are not eligible for
                  return or refund
                </strong>
                , except where the product is defective, damaged in transit, or
                materially different from what was ordered.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Customer-created designs",
                  "Personalized text or artwork",
                  "Customer-provided images",
                  "Made-to-order specifications",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-[#ddd1c1] bg-white/70 px-4 py-3"
                  >
                    <X
                      size={15}
                      className="shrink-0 text-[#9b7b46]"
                      strokeWidth={2}
                    />

                    <span className="text-xs text-zinc-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* NON RETURNABLE */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16"
        >
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9b7b46]">
                02 · Exceptions
              </p>

              <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
                What cannot be returned?
              </h2>

              <p className="mt-5 max-w-[420px] text-sm leading-7 text-zinc-500">
                The following products or situations are generally excluded from
                standard returns.
              </p>
            </div>

            <div className="rounded-[22px] border border-[#e3ddd5] bg-white p-6 sm:p-8">
              <div className="grid gap-1">
                {nonReturnablePoints.map((point, index) => (
                  <div
                    key={point}
                    className="flex gap-4 border-b border-[#eee9e3] py-4 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    <span className="font-mono text-[10px] text-[#b19a78]">
                      0{index + 1}
                    </span>

                    <p className="text-sm leading-6 text-zinc-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RETURN PROCESS */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20"
        >
          <div className="text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9b7b46]">
              03 · How it works
            </p>

            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Four simple steps.
            </h2>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-[#ddd5ca] lg:block" />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {returnSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative rounded-[20px] border border-[#e3ddd5] bg-white p-6"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#d9cbb9] bg-[#f7f2eb] font-serif text-xl text-[#9b7b46]">
                    {step.number}
                  </div>

                  <h3 className="mt-7 text-base font-semibold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* SHIPPING */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 grid overflow-hidden rounded-[25px] border border-[#ddd5ca] bg-white lg:grid-cols-[1fr_1fr]"
        >
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9b7b46]">
              04 · Shipping
            </p>

            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Delivery made simple.
            </h2>

            <p className="mt-5 max-w-[520px] text-sm leading-7 text-zinc-500">
              Shipping charges depend on the value of your order. The applicable
              shipping charge is displayed during checkout before you place the
              order.
            </p>
          </div>

          <div className="grid grid-cols-2 border-t border-[#e6e0d8] bg-[#f5f1eb] lg:border-l lg:border-t-0">
            <div className="flex flex-col justify-center border-r border-[#ddd5ca] p-7 sm:p-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Orders below
              </span>

              <span className="mt-3 font-serif text-5xl tracking-[-0.05em]">
                ₹1,000
              </span>

              <span className="mt-2 text-sm text-zinc-500">Shipping ₹85</span>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Orders ₹1,000+
              </span>

              <span className="mt-3 font-serif text-5xl tracking-[-0.05em]">
                FREE
              </span>

              <span className="mt-2 text-sm text-zinc-500">
                No shipping charge
              </span>
            </div>
          </div>
        </motion.div>

        {/* DAMAGED / WRONG */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 grid gap-5 md:grid-cols-2"
        >
          <div className="rounded-[22px] border border-[#e3ddd5] bg-[#fffdf9] p-7 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1e7d9]">
              <ShieldAlert
                size={20}
                strokeWidth={1.5}
                className="text-[#9b7b46]"
              />
            </div>

            <h3 className="mt-6 font-serif text-2xl">Damaged or defective?</h3>

            <p className="mt-3 text-sm leading-7 text-zinc-500">
              If your product arrives damaged, defective, or materially
              different from what you ordered, contact us as soon as possible
              with your order details and clear photographs or other relevant
              evidence.
            </p>
          </div>

          <div className="rounded-[22px] border border-[#e3ddd5] bg-[#fffdf9] p-7 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1e7d9]">
              <PackageCheck
                size={20}
                strokeWidth={1.5}
                className="text-[#9b7b46]"
              />
            </div>

            <h3 className="mt-6 font-serif text-2xl">
              Wrong product received?
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-500">
              If you receive a product different from the one you ordered,
              contact our support team with your order number and photographs.
              We will review the issue and arrange an appropriate resolution.
            </p>
          </div>
        </motion.div>

        {/* REFUND */}

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-20 overflow-hidden rounded-[28px] bg-[#171717] px-7 py-10 text-white sm:px-10 sm:py-14 lg:px-14"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#9b7b46]/15 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#b99b70]">
                05 · Refunds
              </p>

              <h2 className="mt-4 max-w-[650px] font-serif text-4xl leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Your refund follows
                <br />
                <span className="text-white/35">the original payment.</span>
              </h2>

              <p className="mt-6 max-w-[620px] text-sm leading-7 text-white/50">
                Once an eligible returned product is received and successfully
                inspected, the applicable refund will be initiated to the
                original payment method used for the order, subject to the
                payment provider&apos;s processing time.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/[0.05] p-6">
              <div className="flex items-center gap-3">
                <CreditCard
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#b99b70]"
                />

                <span className="text-sm font-medium">Refund processing</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#b99b70]" />

                  <p className="text-xs leading-6 text-white/50">
                    Product received and inspected.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#b99b70]" />

                  <p className="text-xs leading-6 text-white/50">
                    Refund approved according to the policy.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#b99b70]" />

                  <p className="text-xs leading-6 text-white/50">
                    Refund initiated to the original payment method.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CANCELLATION */}

        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]"
        >
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9b7b46]">
              06 · Cancellation
            </p>

            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Need to cancel?
            </h2>
          </div>

          <div className="rounded-[22px] border border-[#e3ddd5] bg-white p-7 sm:p-9">
            <p className="text-sm leading-7 text-zinc-600">
              Cancellation requests should be submitted as soon as possible.
              Orders that have already entered processing, customization,
              dispatch, or shipment may not be cancellable.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-600">
              Customized products may not be cancellable once production has
              started because they are created according to the customer&apos;s
              specifications.
            </p>
          </div>
        </motion.div>

        {/* IMPORTANT NOTE */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 flex gap-4 rounded-[18px] border border-[#e1d7c9] bg-[#f1ebe2] p-6"
        >
          <Clock3
            size={20}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-[#9b7b46]"
          />

          <div>
            <p className="text-sm font-semibold text-black">
              Refund timing can vary.
            </p>

            <p className="mt-1 text-xs leading-6 text-zinc-600">
              After The GetOvr initiates a refund, the time taken for the amount
              to appear in your account can depend on your bank, card issuer,
              UPI provider, payment gateway, or other payment service provider.
            </p>
          </div>
        </motion.div>

        {/* CONTACT CTA */}

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16 flex flex-col justify-between gap-8 border-t border-[#ddd6ce] pt-10 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9b7b46]">
              Need help?
            </p>

            <h2 className="mt-3 font-serif text-3xl tracking-[-0.035em] sm:text-4xl">
              Let&apos;s sort it out.
            </h2>

            <p className="mt-3 max-w-[550px] text-sm leading-7 text-zinc-500">
              For return, replacement, refund or order-related questions,
              contact our support team with your order number.
            </p>
          </div>

          <a
            href="mailto:customer@thegetovr.in"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Contact The GetOvr
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </section>
    </main>
  );
}
