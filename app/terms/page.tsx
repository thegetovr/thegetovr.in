"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  ShoppingBag,
  UserRound,
  CreditCard,
  Truck,
  RefreshCcw,
  FileText,
  LockKeyhole,
} from "lucide-react";

const sections = [
  {
    id: "about",
    number: "01",
    title: "About The GetOvr",
    icon: FileText,
    content: (
      <p>
        The GetOvr is an online platform through which customers can browse and
        purchase products, save products to their wishlist, manage their
        accounts, place orders, and use other features made available through
        the website.
      </p>
    ),
  },
  {
    id: "eligibility",
    number: "02",
    title: "Eligibility & Accounts",
    icon: UserRound,
    content: (
      <>
        <p>
          You must provide accurate information when creating an account or
          placing an order.
        </p>

        <ul>
          <li>Keep your account information accurate and updated.</li>
          <li>
            Do not use another person&apos;s account without authorization.
          </li>
          <li>Keep your login credentials confidential.</li>
          <li>Notify us if you believe your account has been compromised.</li>
        </ul>
      </>
    ),
  },
  {
    id: "data",
    number: "03",
    title: "Information We Collect & Use",
    icon: ShieldCheck,
    highlight: true,
    content: (
      <>
        <p>
          When you use The GetOvr, we may collect information necessary to
          provide our services. Depending on how you use the website, this may
          include your name, email address, phone number, delivery address,
          account information, order information, wishlist information, and
          information submitted through forms or customer support.
        </p>

        <h3>How we use your information</h3>

        <ul>
          <li>Create and manage your account.</li>
          <li>Authenticate your login and secure your account.</li>
          <li>Process and fulfil your orders.</li>
          <li>Deliver products to you.</li>
          <li>Process payments through applicable payment providers.</li>
          <li>Send order confirmations and delivery updates.</li>
          <li>Send password reset and account-security emails.</li>
          <li>Maintain your wishlist and account preferences.</li>
          <li>Provide customer support.</li>
          <li>Prevent fraud, abuse and unauthorized access.</li>
          <li>Improve website functionality and user experience.</li>
          <li>Comply with applicable legal and regulatory requirements.</li>
        </ul>

        <div className="mt-6 rounded-xl border border-[#ddd5ca] bg-white p-5 sm:p-6">
          <p className="text-black">
            <strong>Your information is not sold.</strong> The GetOvr does not
            sell your personal information to third parties. Where service
            providers are required to operate the website, we may share only the
            information reasonably necessary for those services.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "cookies",
    number: "04",
    title: "Cookies & Authentication",
    icon: LockKeyhole,
    content: (
      <>
        <p>
          The GetOvr may use cookies and similar technologies to keep you
          securely logged in, maintain authentication sessions, remember
          necessary preferences, maintain website functionality, and protect
          accounts from unauthorized activity.
        </p>

        <p>
          Authentication cookies may be stored securely in your browser and may
          be necessary for account-related features to work.
        </p>
      </>
    ),
  },
  {
    id: "products",
    number: "05",
    title: "Products & Availability",
    icon: ShoppingBag,
    content: (
      <>
        <p>
          We try to ensure that product information displayed on the website is
          accurate, including product names, descriptions, images, prices, stock
          availability, categories, variants and specifications.
        </p>

        <p>
          Minor differences may occur between product images displayed on your
          device and the actual product due to screen settings, lighting,
          photography, or manufacturing variations.
        </p>

        <p>
          Products displayed on The GetOvr are subject to availability. Adding a
          product to your wishlist or cart does not necessarily reserve that
          product for you.
        </p>
      </>
    ),
  },
  {
    id: "orders",
    number: "06",
    title: "Orders & Pricing",
    icon: ShoppingBag,
    content: (
      <>
        <p>
          When you place an order, you are submitting a request to purchase the
          selected products. An order is considered accepted when The GetOvr
          confirms the order through the website or an order confirmation
          communication.
        </p>

        <p>
          Prices are displayed in Indian Rupees (INR), unless otherwise
          specified. We reserve the right to correct errors in product
          information, pricing, stock availability, or descriptions.
        </p>

        <p>
          We may cancel or refuse an order where reasonably necessary, including
          product unavailability, incorrect pricing, suspected fraud, payment
          problems, delivery limitations, or technical errors.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    number: "07",
    title: "Payments",
    icon: CreditCard,
    content: (
      <p>
        Payments may be processed through third-party payment service providers.
        You agree to provide valid and accurate payment information where
        required. Payment providers may have their own terms and privacy
        policies.
      </p>
    ),
  },
  {
    id: "delivery",
    number: "08",
    title: "Delivery",
    icon: Truck,
    content: (
      <>
        <p>
          We will attempt to deliver orders to the address provided during
          checkout. Delivery times may depend on the delivery location, product
          availability, processing time, courier availability, weather, public
          holidays, and other circumstances outside our reasonable control.
        </p>

        <p>
          Customers are responsible for providing a correct and complete
          delivery address and contact information.
        </p>
      </>
    ),
  },
  {
    id: "returns",
    number: "09",
    title: "Returns, Refunds & Exchanges",
    icon: RefreshCcw,
    content: (
      <p>
        Returns, refunds, replacements, or exchanges are subject to our
        applicable Return & Refund Policy. Products may be subject to specific
        eligibility conditions depending on their type, condition,
        customization, and reason for return.
      </p>
    ),
  },
  {
    id: "custom",
    number: "10",
    title: "Customized Products",
    icon: FileText,
    content: (
      <>
        <p>
          If The GetOvr offers customized or personalized products, you are
          responsible for providing accurate customization information, artwork,
          text, images, measurements, or other specifications.
        </p>

        <p>
          You confirm that you have the necessary rights to use any content
          submitted for customization. Customized products may have different
          return or cancellation conditions because they are produced according
          to customer specifications.
        </p>
      </>
    ),
  },
  {
    id: "content",
    number: "11",
    title: "User Content",
    icon: UserRound,
    content: (
      <>
        <p>
          If you submit reviews, photos, comments, feedback, or other content to
          The GetOvr, you are responsible for ensuring that the content does not
          violate applicable laws or the rights of others.
        </p>

        <p>
          You must not submit content that infringes copyright, trademark,
          privacy, or other rights, contains malicious code, is fraudulent or
          misleading, or contains unlawful or abusive material.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    number: "12",
    title: "Intellectual Property",
    icon: FileText,
    content: (
      <p>
        The GetOvr&apos;s logo, brand name, website design, graphics, images,
        text, product presentation, software, UI elements and original content
        may be owned by or licensed to The GetOvr and may be protected by
        applicable intellectual-property laws. Unauthorized reproduction,
        modification, distribution, or commercial exploitation is not permitted.
      </p>
    ),
  },
  {
    id: "prohibited",
    number: "13",
    title: "Prohibited Activities",
    icon: ShieldCheck,
    content: (
      <>
        <p>You must not use The GetOvr to:</p>

        <ul>
          <li>Commit fraud or submit fraudulent orders.</li>
          <li>Attempt unauthorized access.</li>
          <li>Circumvent security measures.</li>
          <li>Introduce malware or malicious code.</li>
          <li>Create fake accounts or abuse promotions.</li>
          <li>Interfere with website functionality.</li>
          <li>Use another person&apos;s account without authorization.</li>
          <li>Violate applicable laws.</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    number: "14",
    title: "Account Security",
    icon: LockKeyhole,
    content: (
      <p>
        We use reasonable technical and organizational measures to protect user
        accounts and information. However, no internet-based system can be
        guaranteed to be completely secure. You are responsible for keeping your
        password and account credentials confidential.
      </p>
    ),
  },
  {
    id: "third-party",
    number: "15",
    title: "Third-Party Services",
    icon: ArrowUpRight,
    content: (
      <p>
        The website may use third-party services such as payment providers,
        email providers, cloud storage or media services, hosting providers,
        delivery services, analytics, and security services. These providers may
        process information necessary to provide their respective services.
      </p>
    ),
  },
  {
    id: "availability",
    number: "16",
    title: "Website Availability",
    icon: ArrowUpRight,
    content: (
      <p>
        We aim to keep The GetOvr available and functioning properly, but we do
        not guarantee uninterrupted availability. The website may occasionally
        be unavailable because of maintenance, updates, technical issues,
        hosting problems, security incidents, network failures, or events
        outside our reasonable control.
      </p>
    ),
  },
  {
    id: "liability",
    number: "17",
    title: "Limitation of Liability",
    icon: ShieldCheck,
    content: (
      <p>
        To the extent permitted by applicable law, The GetOvr will not be
        responsible for losses arising from circumstances beyond our reasonable
        control. Nothing in these Terms is intended to exclude or limit
        liability that cannot legally be excluded or limited under applicable
        law.
      </p>
    ),
  },
  {
    id: "changes",
    number: "18",
    title: "Changes to These Terms",
    icon: FileText,
    content: (
      <p>
        We may update these Terms & Conditions from time to time. When changes
        are made, we may update the Last Updated date displayed on this page.
        Your continued use of The GetOvr after updated terms become effective
        constitutes acceptance of the updated Terms, to the extent permitted by
        applicable law.
      </p>
    ),
  },
  {
    id: "privacy",
    number: "19",
    title: "Privacy",
    icon: LockKeyhole,
    content: (
      <p>
        Our handling of personal information is also governed by our Privacy
        Policy. The Privacy Policy explains in greater detail what information
        we collect, why we collect it, how we use it, how we protect it, when
        information may be shared, and your available rights and choices.
      </p>
    ),
  },
  {
    id: "law",
    number: "20",
    title: "Governing Law",
    icon: FileText,
    content: (
      <p>
        These Terms & Conditions shall be governed by the applicable laws of
        India. Any disputes shall be subject to the jurisdiction of the
        appropriate courts having jurisdiction over the matter, subject to
        applicable law.
      </p>
    ),
  },
  {
    id: "contact",
    number: "21",
    title: "Contact Us",
    icon: ArrowUpRight,
    content: (
      <>
        <p>
          If you have questions about these Terms & Conditions, your account, an
          order, or our services, you can contact The GetOvr.
        </p>

        <div className="mt-5 rounded-xl border border-[#ddd5ca] bg-white p-5">
          <p className="font-medium text-black">The GetOvr</p>

          <p className="mt-2">
            Website:{" "}
            <a
              href="https://thegetovr.in"
              className="font-medium text-black underline underline-offset-4"
            >
              thegetovr.in
            </a>
          </p>

          <p className="mt-1">
            Email:{" "}
            <a
              href="mailto:customer@thegetovr.in"
              className="font-medium text-black underline underline-offset-4"
            >
              customer@thegetovr.in
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fcfbf9] text-black">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-[#e6e0d8]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-[#eee3d5]/60 blur-3xl" />
          <div className="absolute -bottom-40 -left-24 h-[360px] w-[360px] rounded-full bg-[#e9e1d7]/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-7 sm:pb-20 lg:px-10 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 transition hover:text-black"
            >
              <ArrowLeft size={14} strokeWidth={1.7} />
              Back to Home
            </Link>
          </motion.div>

          <div className="mt-16 max-w-4xl sm:mt-20 lg:mt-24">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9b7b46] sm:text-xs"
            >
              The GetOvr · Legal
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.14,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 font-serif text-5xl font-medium tracking-[-0.035em] text-black sm:text-6xl lg:text-8xl"
            >
              Terms
              <br />
              <span className="text-zinc-400">& Conditions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8"
            >
              These terms explain how The GetOvr works, what you can expect from
              us, and the responsibilities that come with using our website,
              products, accounts, and services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.34,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <span className="rounded-full border border-[#ddd5ca] bg-white px-4 py-2 text-xs text-zinc-600">
                Last Updated: 20 September 2026
              </span>

              <span className="rounded-full border border-[#ddd5ca] bg-white px-4 py-2 text-xs text-zinc-600">
                Applicable to thegetovr.in
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
          {/* LEFT SIDEBAR - NO ANIMATION */}

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                On this page
              </p>

              <nav className="mt-5 max-h-[70vh] space-y-1 overflow-y-auto pr-3">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-zinc-500 transition hover:bg-white hover:text-black"
                  >
                    <span className="w-6 text-[9px] font-medium text-zinc-300 transition group-hover:text-[#9b7b46]">
                      {section.number}
                    </span>

                    <span className="truncate">{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* RIGHT SIDE - ANIMATED ONLY */}

          <div className="min-w-0">
            {/* INTRO ANIMATION */}

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-12 rounded-2xl border border-[#ddd5ca] bg-white p-6 sm:p-8 lg:p-10"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5efe7]">
                  <ShieldCheck
                    size={21}
                    strokeWidth={1.5}
                    className="text-[#9b7b46]"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    Please read these terms carefully
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    By accessing or using The GetOvr, creating an account,
                    placing an order, or using our services, you agree to these
                    Terms & Conditions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* TERMS CARDS - RIGHT SIDE ANIMATION ONLY */}

            <div className="space-y-5">
              {sections.map((section, index) => {
                const Icon = section.icon;
                const fromLeft = index % 2 === 0;

                return (
                  <motion.article
                    key={section.id}
                    id={section.id}
                    initial={{
                      opacity: 0,
                      x: fromLeft ? -35 : 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.08,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: Math.min(index * 0.015, 0.12),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`scroll-mt-24 rounded-2xl border p-6 sm:p-8 lg:p-10 ${
                      section.highlight
                        ? "border-[#cdbb9f] bg-[#f8f4ee]"
                        : "border-[#e3ddd5] bg-white"
                    }`}
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <div className="hidden shrink-0 sm:flex sm:h-11 sm:w-11 sm:items-center sm:justify-center sm:rounded-full sm:bg-[#f5f1eb]">
                        <Icon
                          size={19}
                          strokeWidth={1.5}
                          className="text-[#9b7b46]"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7b46]">
                              {section.number}
                            </p>

                            <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-black sm:text-3xl">
                              {section.title}
                            </h2>
                          </div>

                          <Icon
                            size={18}
                            strokeWidth={1.5}
                            className="mt-1 shrink-0 text-zinc-300 sm:hidden"
                          />
                        </div>

                        <div className="terms-content mt-6 space-y-4 text-sm leading-7 text-zinc-600 sm:text-[15px] sm:leading-8">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* CTA ANIMATION */}

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12 rounded-2xl bg-black px-6 py-10 text-white sm:px-10 sm:py-12"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                Questions?
              </p>

              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                We&apos;re here to help.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
                If you have questions about these terms, your account, an order,
                or our services, get in touch with The GetOvr.
              </p>

              <a
                href="mailto:customer@thegetovr.in"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Contact The GetOvr
                <ArrowUpRight size={15} strokeWidth={1.7} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .terms-content p {
          margin: 0;
        }

        .terms-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #111111;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .terms-content ul {
          margin-top: 0.75rem;
          padding-left: 1.25rem;
          list-style: disc;
        }

        .terms-content li {
          padding-left: 0.25rem;
          margin-bottom: 0.35rem;
        }

        .terms-content strong {
          font-weight: 600;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}
