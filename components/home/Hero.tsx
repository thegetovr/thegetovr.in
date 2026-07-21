import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroShowcase from "./HeroShowcase";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Glow */}
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[180px]" />

        {/* Left Glow */}
        <div className="absolute left-20 top-32 h-[300px] w-[300px] rounded-full bg-white/[0.02] blur-[120px]" />

        {/* Right Glow */}
        <div className="absolute right-20 bottom-20 h-[350px] w-[350px] rounded-full bg-white/[0.025] blur-[140px]" />

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1a1a1a_0%,#0b0b0b_45%,#000000_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-center justify-between gap-24 px-8 pt-20">

        {/* LEFT CONTENT */}

        <div className="max-w-xl">

          <p className="mb-6 text-xs uppercase tracking-[0.55em] text-gray-500">
            PREMIUM CUSTOM APPAREL
          </p>

          <h1 className="text-6xl font-black leading-[0.92] tracking-[-0.04em] lg:text-7xl xl:text-8xl">
            Wear
            <br />
            Your
            <br />
            Identity.
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-gray-400">
            Create premium hoodies and T-shirts with your own artwork,
            branding, and ideas. Designed by you. Printed by us.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <Link
              href="/studio"
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105"
            >
              Start Designing

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/shop"
              className="rounded-full border border-white/15 px-8 py-4 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Shop Collection
            </Link>

          </div>

          {/* Trust Row */}

          <div className="mt-12 flex flex-wrap gap-8 text-sm text-gray-500">

            <span>✓ Premium Quality</span>

            <span>✓ Printed On Demand</span>

            <span>✓ Made in India</span>

          </div>

        </div>

        {/* RIGHT CONTENT */}

        <div className="flex flex-1 justify-center lg:justify-end">
          <HeroShowcase />
        </div>

      </div>
    </section>
  );
}