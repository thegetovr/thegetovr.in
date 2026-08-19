import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroShowcase from "./HeroShowcase";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-(--color-page)">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-(--color-accent)/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-(--color-accent)/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-between gap-16 px-6 py-20 lg:px-8 lg:py-24">
        <div className="max-w-xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-(--color-text-muted)">
            Premium Custom Apparel
          </p>

          <h1 className="font-(--font-editorial) text-6xl font-normal leading-[0.92] tracking-tight text-(--color-text-primary) sm:text-7xl lg:text-8xl">
            Wear
            <br />
            Your
            <br />
            Identity.
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-(--color-text-secondary)">
            Create premium hoodies and T-shirts with your own artwork,
            branding, and ideas. Designed by you. Printed by us.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/studio"
              className="group flex items-center gap-2 rounded-sm bg-(--color-text-primary) px-7 py-3.5 font-medium text-(--color-white) transition-colors duration-300 hover:bg-(--color-text-secondary)"
            >
              Start Designing

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/shop"
              className="rounded-sm border border-(--color-border) px-7 py-3.5 font-medium text-(--color-text-primary) transition-colors duration-300 hover:border-(--color-text-primary) hover:bg-(--color-surface-muted)"
            >
              Shop Collection
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-(--color-text-muted)">
            <span>✓ Premium Quality</span>
            <span>✓ Printed On Demand</span>
            <span>✓ Made in India</span>
          </div>
        </div>

        <div className="flex flex-1 justify-center lg:justify-end">
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}