"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Cookie,
  Database,
  Eye,
  FileText,
  KeyRound,
  Lock,
  Mail,
  Shield,
  UserRound,
} from "lucide-react";

const privacySections = [
  {
    number: "01",
    title: "Information We Collect",
    intro:
      "We collect information that helps us provide, secure and improve your experience with The GetOvr.",
    points: [
      "Account information such as your name, email address and phone number.",
      "Shipping, billing and order information when you make a purchase.",
      "Information you provide when contacting our support team.",
      "Basic device, browser and website usage information.",
    ],
  },
  {
    number: "02",
    title: "How We Use Information",
    intro:
      "Your information is used for legitimate purposes connected with operating and improving our services.",
    points: [
      "Create and manage your account.",
      "Process, fulfil and deliver orders.",
      "Provide customer support and respond to enquiries.",
      "Send important account and order-related communications.",
      "Improve website performance, products and customer experience.",
      "Prevent fraud, abuse and security incidents.",
    ],
  },
  {
    number: "03",
    title: "Information Sharing",
    intro:
      "We may work with trusted service providers when sharing information is reasonably necessary to provide our services.",
    points: [
      "Payment processing providers.",
      "Shipping and delivery partners.",
      "Hosting and infrastructure providers.",
      "Email and communication services.",
      "Security, analytics and technical service providers.",
    ],
  },
  {
    number: "04",
    title: "Cookies & Similar Technologies",
    intro:
      "Cookies and similar technologies may be used to keep the website functional and improve your experience.",
    points: [
      "Maintain login sessions and essential functionality.",
      "Remember preferences where applicable.",
      "Understand website usage and improve performance.",
      "Support security and fraud-prevention measures.",
    ],
  },
  {
    number: "05",
    title: "Data Security",
    intro:
      "We use reasonable technical and organizational measures designed to protect your information.",
    points: [
      "Protection against unauthorized access.",
      "Protection against unauthorized alteration or disclosure.",
      "Security measures appropriate to the nature of the information.",
      "Ongoing review of security practices where reasonably appropriate.",
    ],
  },
  {
    number: "06",
    title: "Data Retention",
    intro:
      "We retain information only for as long as reasonably necessary for the purposes for which it was collected.",
    points: [
      "Providing and maintaining our services.",
      "Maintaining transaction and business records.",
      "Resolving disputes and enforcing agreements.",
      "Meeting applicable legal and regulatory obligations.",
    ],
  },
  {
    number: "07",
    title: "Your Rights",
    intro:
      "Depending on applicable law, you may have rights relating to your personal information.",
    points: [
      "Request access to information associated with your account.",
      "Request correction of inaccurate information.",
      "Request deletion where applicable.",
      "Manage certain communication preferences.",
    ],
  },
  {
    number: "08",
    title: "Children's Privacy",
    intro:
      "Our services are not intended to knowingly collect personal information from children without appropriate authorization.",
    points: [
      "If you believe a child has provided personal information to us, contact our support team.",
      "We may review the information and take appropriate action.",
    ],
  },
  {
    number: "09",
    title: "Changes to This Policy",
    intro:
      "Our Privacy Policy may change as our services, technology, legal requirements or business practices evolve.",
    points: [
      "Updated versions will be published on this page.",
      "The updated date will be displayed with the policy.",
      "We encourage users to review this page periodically.",
    ],
  },
];

const quickFacts = [
  {
    icon: Lock,
    title: "Secure by design",
    text: "We use reasonable measures to protect information.",
  },
  {
    icon: Database,
    title: "Purpose driven",
    text: "Information is collected for legitimate service purposes.",
  },
  {
    icon: Eye,
    title: "Transparency",
    text: "We explain how information is handled.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f0ea] text-[#171717]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#eee8df] text-[#171717]">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.45, 0.65, 0.45],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#9b7b46]/15 blur-[120px]"
          />

          <motion.div
            animate={{
              scale: [1.08, 1, 1.08],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-52 left-[-120px] h-[500px] w-[500px] rounded-full bg-[#d8c5aa]/45 blur-[120px]"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(155,123,70,0.08),transparent_32%)]" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-7 sm:px-7 sm:pb-20 lg:px-10 lg:pb-24">
          {/* TOP BAR */}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:text-[#171717]"
            >
              <span className="transition group-hover:-translate-x-1">←</span>
              Back Home
            </Link>

            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              The GetOvr / Privacy
            </span>
          </motion.div>

          {/* HERO CONTENT */}

          <div className="mt-20 grid items-center gap-16 lg:mt-28 lg:grid-cols-[1fr_460px]">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#d8d0c7] bg-white/55 px-4 py-2"
              >
                <Shield
                  size={13}
                  strokeWidth={1.5}
                  className="text-[#9b7b46]"
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Privacy & Data
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.18,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 max-w-[850px] font-serif text-[clamp(4rem,9vw,8.8rem)] font-medium leading-[0.82] tracking-[-0.07em]"
              >
                Your data.
                <br />
                <span className="text-zinc-400">Your trust.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 max-w-[600px] text-sm leading-7 text-zinc-600 sm:text-[15px] sm:leading-8"
              >
                We believe privacy should be understandable, not hidden behind
                complicated language. This policy explains what information we
                collect, why we use it and how we protect it.
              </motion.p>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 130, opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-9 h-px bg-[#9b7b46]"
              />
            </div>

            {/* PRIVACY ORBIT */}

            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 0.25,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto h-[340px] w-[340px] sm:h-[390px] sm:w-[390px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-[#d3cbc1]"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[28px] rounded-full border border-[#9b7b46]/30 border-dashed"
              />

              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  boxShadow: [
                    "0 0 0 rgba(155,123,70,0)",
                    "0 0 70px rgba(155,123,70,0.16)",
                    "0 0 0 rgba(155,123,70,0)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-[72px] flex items-center justify-center rounded-full border border-[#9b7b46]/30 bg-[#9b7b46]/10 backdrop-blur-sm"
              >
                <Shield size={72} strokeWidth={1} className="text-[#9b7b46]" />
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                <span className="absolute left-1/2 top-[-5px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#9b7b46] shadow-[0_0_18px_rgba(155,123,70,0.45)]" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[28px]"
              >
                <span className="absolute bottom-[-4px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-500" />
              </motion.div>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#d3cbc1] bg-white/65 px-4 py-2 backdrop-blur-md">
                <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Protected information
                </span>
              </div>
            </motion.div>
          </div>

          {/* META */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#d8d0c7] pt-5"
          >
            <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400">
              Last Updated · 20 September 2026
            </span>

            <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400">
              thegetovr.in
            </span>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          QUICK FACTS
      ===================================================== */}

      <section className="border-b border-[#ded7cf] bg-[#eee8df]">
        <div className="mx-auto grid max-w-[1250px] sm:grid-cols-3">
          {quickFacts.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`px-6 py-8 sm:px-8 sm:py-10 ${
                  index !== 2 ? "border-b sm:border-b-0 sm:border-r" : ""
                } border-[#ded7cf]`}
              >
                <Icon size={19} strokeWidth={1.5} className="text-[#9b7b46]" />

                <p className="mt-5 text-sm font-semibold">{item.title}</p>

                <p className="mt-2 text-xs leading-6 text-zinc-500">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-7 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"
        >
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9b7b46]">
              A simple promise
            </p>

            <h2 className="mt-4 max-w-[420px] font-serif text-4xl leading-[0.95] tracking-[-0.045em] sm:text-5xl">
              Privacy should feel simple.
            </h2>
          </div>

          <div className="border-l border-[#d8d0c7] pl-6 sm:pl-9">
            <p className="text-[15px] leading-8 text-zinc-600">
              The GetOvr respects your privacy and aims to handle your
              information responsibly. We collect information that is reasonably
              necessary to provide, maintain and improve our website and
              services.
            </p>

            <p className="mt-5 text-[15px] leading-8 text-zinc-600">
              By using our website, creating an account or placing an order, you
              acknowledge the practices described in this Privacy Policy.
            </p>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          POLICY FLOW
      ===================================================== */}

      <section className="bg-[#eee8df] px-5 py-20 text-[#171717] sm:px-7 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1150px]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9b7b46]">
              Inside the policy
            </p>

            <h2 className="mt-4 max-w-[700px] font-serif text-4xl leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              How your information
              <br />
              moves through The GetOvr.
            </h2>
          </motion.div>

          <div className="mt-16">
            {privacySections.map((section, index) => (
              <motion.article
                key={section.number}
                id={`section-${section.number}`}
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-t border-[#d5ccc0] py-10 last:border-b"
              >
                <div className="grid gap-8 lg:grid-cols-[90px_0.8fr_1.2fr] lg:gap-12">
                  <div>
                    <span className="font-mono text-[10px] text-[#9b7b46]">
                      {section.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl leading-none tracking-[-0.035em] transition group-hover:text-[#9b7b46] sm:text-4xl">
                      {section.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm leading-7 text-zinc-600">
                      {section.intro}
                    </p>

                    <div className="mt-7 space-y-3">
                      {section.points.map((point) => (
                        <div
                          key={point}
                          className="flex gap-3 text-xs leading-6 text-zinc-600"
                        >
                          <Check
                            size={14}
                            strokeWidth={1.7}
                            className="mt-1 shrink-0 text-[#9b7b46]"
                          />

                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          DATA PRINCIPLES
      ===================================================== */}

      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-7 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9b7b46]">
            Our approach
          </p>

          <h2 className="mt-4 font-serif text-4xl tracking-[-0.045em] sm:text-5xl">
            Three principles we follow.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: KeyRound,
              title: "Purpose",
              text: "Collect and use information for legitimate purposes connected with our services.",
            },
            {
              icon: Shield,
              title: "Protection",
              text: "Use reasonable measures designed to protect information from unauthorized access.",
            },
            {
              icon: UserRound,
              title: "Control",
              text: "Provide appropriate ways for users to manage their account information and preferences.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, rotateX: 15, y: 30 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="rounded-[24px] border border-[#ded7cf] bg-white p-7 transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(50,40,30,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1ebe2]">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#9b7b46]"
                  />
                </div>

                <h3 className="mt-7 font-serif text-2xl">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section className="px-5 pb-20 sm:px-7 lg:px-10 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[1200px] overflow-hidden rounded-[30px] bg-[#9b7b46] px-7 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        >
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Mail size={19} strokeWidth={1.5} />
              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.24em] text-white/65">
                Privacy questions?
              </p>

              <h2 className="mt-3 max-w-[650px] font-serif text-4xl leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                We&apos;re here to help.
              </h2>

              <p className="mt-5 max-w-[620px] text-sm leading-7 text-white/75">
                If you have questions, requests or concerns regarding this
                Privacy Policy or your personal information, contact our support
                team.
              </p>
            </div>

            <a
              href="mailto:customer@thegetovr.in"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-medium text-[#171717] transition hover:bg-[#f3eee8]"
            >
              customer@thegetovr.in
              <ArrowUpRight
                size={16}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER NOTE */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-[1200px] border-t border-[#ddd6ce] px-5 py-7 sm:px-7 lg:px-10"
      >
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
            The GetOvr · Privacy Policy
          </p>

          <Link
            href="/terms"
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-[#9b7b46]"
          >
            Terms & Conditions
            <ArrowRight
              size={13}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
