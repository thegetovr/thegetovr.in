import Link from "next/link";
import { ArrowRight, Check, Sparkles, Truck, Star } from "lucide-react";
import HeroShowcase from "./HeroShowcase";

import Reveal from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

const trustPoints = [
  {
    icon: Check,
    title: "Premium Quality",
    subtitle: "Built to last",
  },
  {
    icon: Sparkles,
    title: "Custom Designs",
    subtitle: "Make it yours",
  },
  {
    icon: Truck,
    title: "Fast & Reliable",
    subtitle: "Pan India",
  },
  {
    icon: Star,
    title: "Loved by Thousands",
    subtitle: "4.5+ ratings",
  },
];

export default function Hero() {
  return (
    <section className="bg-(--color-page)">
      <div className="grid w-full lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        {/* Content */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-10 xl:px-12">
          <div className="max-w-[560px]">
            {/* Eyebrow */}
            <Reveal y={15} duration={0.6}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-(--color-text-primary)">
                Light Canvas. Dark Attitude.
              </p>
            </Reveal>

            {/* Heading */}
            <Reveal delay={0.08} y={25} duration={0.85}>
              <h1 className="mt-5 font-(--font-sans) text-[clamp(3.5rem,5vw,5.6rem)] font-black uppercase leading-[0.84] tracking-[-0.055em] text-(--color-text-primary)">
                Wear
                <br />
                What Hits
                <br />
                Different.
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.16} y={20} duration={0.7}>
              <p className="mt-6 max-w-[450px] text-[15px] leading-6 text-(--color-text-secondary) sm:text-base sm:leading-7">
                Premium streetwear. Custom designs. Made for the ones who create
                their own vibe.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={0.22} y={18} duration={0.65}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="group inline-flex min-h-12 items-center gap-3 bg-(--color-text-primary) px-7 text-[11px] font-bold uppercase tracking-[0.04em] text-(--color-white) transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                >
                  Shop Now
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/studio"
                  className="inline-flex min-h-12 items-center border border-(--color-text-primary) px-7 text-[11px] font-bold uppercase tracking-[0.04em] text-(--color-text-primary) transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-text-primary) hover:text-(--color-white)"
                >
                  Explore Studio
                </Link>
              </div>
            </Reveal>

            {/* Trust Points */}
            <Stagger
              className="mt-8 grid grid-cols-2 border-y border-(--color-border) sm:grid-cols-4"
              stagger={0.08}
              delay={0.2}
            >
              {trustPoints.map(({ icon: Icon, title, subtitle }, index) => (
                <StaggerItem
                  key={title}
                  className={`min-w-0 py-4 ${
                    index > 0 ? "border-l border-(--color-border) pl-4" : "pr-4"
                  } ${
                    index > 1
                      ? "border-t border-(--color-border) sm:border-t-0"
                      : ""
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />

                  <p className="mt-2 text-[10px] font-bold leading-4 text-(--color-text-primary) sm:text-[11px]">
                    {title}
                  </p>

                  <p className="mt-0.5 text-[9px] leading-4 text-(--color-text-muted) sm:text-[9.5px]">
                    {subtitle}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="min-h-[390px] sm:min-h-[450px] lg:min-h-full">
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
