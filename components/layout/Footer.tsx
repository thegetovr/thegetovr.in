"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  Mail,
  MapPin,
  Truck,
  ShieldCheck,
  PackageCheck,
  Headphones,
} from "lucide-react";

import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

/* --------------------------------
   Footer Links
--------------------------------- */

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Best Sellers", href: "/shop?sort=bestsellers" },
  { label: "Collections", href: "/collections" },
  { label: "Track Your Order", href: "/track-order" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Return & Refund", href: "/returns" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "FAQs", href: "/faq" },
];

/* --------------------------------
   Footer Link
--------------------------------- */

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center text-[13px] text-[#5b5b5b] transition-colors duration-200 hover:text-black"
      >
        <span>{label}</span>

        <ArrowRight className="ml-1 h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
      </Link>
    </li>
  );
}

/* --------------------------------
   Social Button
--------------------------------- */

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4ded3] bg-[#fbfaf7] text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b9965b] hover:bg-white"
    >
      {children}
    </a>
  );
}

/* --------------------------------
   Footer
--------------------------------- */

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-[#f8f6f1] text-[#171717]">
      <div className="mx-auto max-w-[1500px] px-5 pb-6 pt-10 sm:px-8 lg:px-12 lg:pb-7 lg:pt-12">
        {/* ================================
            MAIN FOOTER
        ================================= */}

        <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.9fr] lg:gap-10">
          {/* ================================
              BRAND
          ================================= */}

          <div>
            <Link
              href="/"
              className="inline-block text-[27px] font-black leading-none tracking-[-0.07em] text-[#151515] sm:text-[29px]"
            >
              THE GETOVR
            </Link>

            <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.32em] text-[#9a7b4f]">
              STYLE&nbsp;&nbsp; · &nbsp;&nbsp;STREET&nbsp;&nbsp; ·
              &nbsp;&nbsp;BEYOND
            </p>

            <p className="mt-4 max-w-[310px] text-[13px] leading-6 text-[#5c5c5c]">
              Premium streetwear and lifestyle products for those who choose
              different. Create your own vibe.
            </p>

            {/* Contact */}
            <div className="mt-4 space-y-2">
              <a
                href="mailto:customer@thegetovr.in"
                className="flex items-center gap-2.5 text-[12px] text-[#666666] transition-colors hover:text-black"
              >
                <Mail className="h-3.5 w-3.5 text-[#b18b4c]" />
                customer@thegetovr.in
              </a>

              <div className="flex items-center gap-2.5 text-[12px] text-[#666666]">
                <MapPin className="h-3.5 w-3.5 text-[#b18b4c]" />
                India
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-4 flex items-center gap-2.5">
              <SocialButton href="#" label="Instagram">
                <IoLogoInstagram className="h-[17px] w-[17px]" />
              </SocialButton>

              <SocialButton href="#" label="Facebook">
                <FaFacebook className="h-[16px] w-[16px]" />
              </SocialButton>

              <SocialButton href="#" label="YouTube">
                <IoLogoYoutube className="h-[18px] w-[18px]" />
              </SocialButton>
            </div>

            {/* Brand Statement */}
            <div className="mt-5">
              <p className="font-serif text-[22px] italic leading-[1.05] text-[#b18b4c]">
                Wear
                <br />
                <span className="ml-6">Your Own Identity</span>
              </p>

              <div className="ml-8 mt-2 h-[2px] w-20 rotate-[-7deg] bg-[#b18b4c]" />
            </div>
          </div>

          {/* ================================
              SHOP
          ================================= */}

          <div>
            <h3 className="text-[16px] font-semibold">Shop</h3>

            <div className="mt-2 h-[2px] w-7 rounded-full bg-[#b18b4c]" />

            <ul className="mt-5 space-y-3">
              {shopLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </div>

          {/* ================================
              COMPANY
          ================================= */}

          <div>
            <h3 className="text-[16px] font-semibold">Company</h3>

            <div className="mt-2 h-[2px] w-7 rounded-full bg-[#b18b4c]" />

            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </div>

          {/* ================================
              SUPPORT
          ================================= */}

          <div>
            <h3 className="text-[16px] font-semibold">Support</h3>

            <div className="mt-2 h-[2px] w-7 rounded-full bg-[#b18b4c]" />

            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </div>

          {/* ================================
              NEWSLETTER
              
              Temporarily disabled.
              Keeping this section commented
              so it can be activated later.
          ================================= */}

          {/*
          <div>
            <h3 className="text-[16px] font-semibold">
              Stay in the Loop
            </h3>

            <div className="mt-2 h-[2px] w-7 rounded-full bg-[#b18b4c]" />

            <p className="mt-5 text-[13px] leading-6 text-[#5c5c5c]">
              Get the latest drops, exclusive offers and style inspiration
              directly in your inbox.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex h-[52px] overflow-hidden rounded-xl border border-[#ddd6ca] bg-white"
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
              />

              <button
                type="submit"
                className="m-1 flex w-12 items-center justify-center rounded-lg bg-[#bd9650] text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
          */}
        </div>

        {/* ================================
            FEATURES
        ================================= */}

        <div className="mt-10 border-y border-[#ddd6ca] py-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {/* Free Shipping */}
            <div className="flex items-center gap-3.5 border-[#ddd6ca] lg:border-r lg:px-6 lg:first:pl-0">
              <Truck
                className="h-7 w-7 shrink-0 text-[#b18b4c]"
                strokeWidth={1.5}
              />

              <div>
                <p className="text-[13px] font-medium text-black">
                  Free Shipping
                </p>

                <p className="mt-0.5 text-[10px] text-[#777777]">
                  On all prepaid orders
                </p>
              </div>
            </div>

            {/* Secure Payments */}
            <div className="flex items-center gap-3.5 border-[#ddd6ca] lg:border-r lg:px-6">
              <ShieldCheck
                className="h-7 w-7 shrink-0 text-[#b18b4c]"
                strokeWidth={1.5}
              />

              <div>
                <p className="text-[13px] font-medium text-black">
                  Secure Payments
                </p>

                <p className="mt-0.5 text-[10px] text-[#777777]">
                  100% safe & secure
                </p>
              </div>
            </div>

            {/* Easy Returns */}
            <div className="flex items-center gap-3.5 border-[#ddd6ca] lg:border-r lg:px-6">
              <PackageCheck
                className="h-7 w-7 shrink-0 text-[#b18b4c]"
                strokeWidth={1.5}
              />

              <div>
                <p className="text-[13px] font-medium text-black">
                  Easy Returns
                </p>

                <p className="mt-0.5 text-[10px] text-[#777777]">
                  Hassle-free returns
                </p>
              </div>
            </div>

            {/* Dedicated Support */}
            <div className="flex items-center gap-3.5 lg:px-6 lg:pr-0">
              <Headphones
                className="h-7 w-7 shrink-0 text-[#b18b4c]"
                strokeWidth={1.5}
              />

              <div>
                <p className="text-[13px] font-medium text-black">
                  Dedicated Support
                </p>

                <p className="mt-0.5 text-[10px] text-[#777777]">
                  We&apos;re here to help
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================================
            BOTTOM BAR
        ================================= */}

        <div className="flex flex-col gap-4 pt-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Copyright */}
          <p className="text-center text-[10px] text-[#666666] lg:text-left">
            © {new Date().getFullYear()} The GetOvr. All rights reserved.
          </p>

          {/* DreamDeploy */}
          <p className="text-center text-[11px] text-[#666666]">
            Crafted with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by{" "}
            <a
              href="https://dreamdeploy.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#a27e42] transition-colors hover:text-[#806332]"
            >
              DreamDeploy
            </a>
          </p>

          {/* Legal + Back To Top */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-end">
            <Link
              href="/terms"
              className="text-[10px] text-[#666666] transition-colors hover:text-black"
            >
              Terms
            </Link>

            <Link
              href="/privacy-policy"
              className="text-[10px] text-[#666666] transition-colors hover:text-black"
            >
              Privacy
            </Link>

            <span className="hidden h-4 w-px bg-[#d5cec2] sm:block" />

            <button
              type="button"
              onClick={handleBackToTop}
              className="flex items-center gap-1.5 rounded-lg border border-[#d6cbb9] px-3 py-2 text-[10px] font-medium text-black transition-all hover:bg-white"
            >
              <ArrowUp className="h-3 w-3" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
