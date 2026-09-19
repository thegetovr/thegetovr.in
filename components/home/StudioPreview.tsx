import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export default function StudioPreview() {
  return (
    <section className="relative overflow-hidden bg-(--color-surface-muted) py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-48 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-(--color-accent)/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Content */}
          <div>
            {/* Label */}
            <Reveal y={20} duration={0.6}>
              <div className="flex items-center gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.35em] text-(--color-text-muted)">
                  Design Studio
                </p>

                <span className="h-px w-10 bg-(--color-border)" />
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={0.08} y={25} duration={0.75}>
              <h2 className="mt-6 max-w-xl font-(--font-editorial) text-5xl font-normal leading-[0.98] tracking-tight text-(--color-text-primary) sm:text-6xl lg:text-7xl">
                Design It
                <br />
                Before You
                <br />
                Wear It.
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.14} y={20} duration={0.65}>
              <p className="mt-7 max-w-lg text-base leading-7 text-(--color-text-secondary) sm:mt-8 sm:text-lg sm:leading-8">
                Upload your logo, add text, position your artwork, preview every
                detail and create apparel that&apos;s uniquely yours.
              </p>
            </Reveal>

            {/* Process */}
            <Stagger
              className="mt-7 grid max-w-md grid-cols-2 border-y border-(--color-border) sm:mt-8"
              stagger={0.08}
              delay={0.12}
            >
              <StaggerItem className="border-r border-(--color-border) py-5 pr-5 sm:py-6">
                <p className="text-xs uppercase tracking-[0.2em] text-(--color-text-muted)">
                  01
                </p>

                <p className="mt-2 text-sm text-(--color-text-primary)">
                  Upload Artwork
                </p>
              </StaggerItem>

              <StaggerItem className="py-5 pl-5 sm:py-6">
                <p className="text-xs uppercase tracking-[0.2em] text-(--color-text-muted)">
                  02
                </p>

                <p className="mt-2 text-sm text-(--color-text-primary)">
                  Customize
                </p>
              </StaggerItem>

              <StaggerItem className="border-r border-(--color-border) border-t py-5 pr-5 sm:py-6">
                <p className="text-xs uppercase tracking-[0.2em] text-(--color-text-muted)">
                  03
                </p>

                <p className="mt-2 text-sm text-(--color-text-primary)">
                  Preview Live
                </p>
              </StaggerItem>

              <StaggerItem className="border-t border-(--color-border) py-5 pl-5 sm:py-6">
                <p className="text-xs uppercase tracking-[0.2em] text-(--color-text-muted)">
                  04
                </p>

                <p className="mt-2 text-sm text-(--color-text-primary)">
                  Order
                </p>
              </StaggerItem>
            </Stagger>

            {/* CTA */}
            <Reveal delay={0.2} y={20} duration={0.6}>
              <Link
                href="/studio"
                className="group mt-8 inline-flex items-center gap-3 rounded-sm bg-(--color-text-primary) px-8 py-4 font-semibold text-(--color-white) transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-text-secondary) sm:mt-10"
              >
                Open Design Studio
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          {/* Studio Visual */}
          <Reveal delay={0.15} y={35} duration={0.9}>
            <div className="relative mt-1 sm:mt-2 lg:mt-0">
              <div className="absolute -inset-4 rounded-full border border-(--color-border)/40 sm:-inset-6" />

              <div className="relative overflow-hidden border border-(--color-border) bg-(--color-surface) shadow-(--shadow-elevated)">
                <Image
                  src="/images/home/studio-preview.png"
                  alt="The Getovr design studio preview"
                  width={1400}
                  height={900}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>

              <div className="absolute -bottom-5 -left-5 hidden border border-(--color-border) bg-(--color-surface) px-5 py-4 shadow-(--shadow-soft) sm:block">
                <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-text-muted)">
                  Your idea
                </p>

                <p className="mt-1 font-(--font-editorial) text-lg text-(--color-text-primary)">
                  Your apparel.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
