import Link from "next/link";
import { ArrowRight, Check, Sparkles, Truck, Star } from "lucide-react";
import { getHomeContent } from "@/lib/homeService";
import HeroShowcase from "./HeroShowcase";

const trustPointIcons = {
  check: Check,
  sparkles: Sparkles,
  truck: Truck,
  star: Star,
};

export default async function Hero() {
  const homeContent = await getHomeContent();
  const hero = homeContent?.hero;

  if (!hero) {
    return null;
  }

  return (
    <section className="bg-(--color-page)">
      <div className="grid w-full lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-10 xl:px-12">
          <div className="max-w-[560px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-(--color-text-primary)">
              {hero.eyebrow}
            </p>

            <h1 className="mt-5 whitespace-pre-line font-(--font-sans) text-[clamp(3.5rem,5vw,5.6rem)] font-black uppercase leading-[0.84] tracking-[-0.055em] text-(--color-text-primary)">
              {hero.heading}
            </h1>

            <p className="mt-6 max-w-[450px] text-[15px] leading-6 text-(--color-text-secondary) sm:text-base sm:leading-7">
              {hero.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={hero.primaryCtaLink}
                className="group inline-flex min-h-12 items-center gap-3 bg-(--color-text-primary) px-7 text-[11px] font-bold uppercase tracking-[0.04em] text-(--color-white) transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                {hero.primaryCtaLabel}
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href={hero.secondaryCtaLink}
                className="inline-flex min-h-12 items-center border border-(--color-text-primary) px-7 text-[11px] font-bold uppercase tracking-[0.04em] text-(--color-text-primary) transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-text-primary) hover:text-(--color-white)"
              >
                {hero.secondaryCtaLabel}
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 border-y border-(--color-border) sm:grid-cols-4">
              {hero.trustPoints.map((point, index) => {
                const Icon =
                  trustPointIcons[
                    point.icon as keyof typeof trustPointIcons
                  ] ?? Check;

                return (
                  <div
                    key={`${point.title}-${index}`}
                    className={`min-w-0 py-4 ${
                      index > 0
                        ? "border-l border-(--color-border) pl-4"
                        : "pr-4"
                    } ${
                      index > 1
                        ? "border-t border-(--color-border) sm:border-t-0"
                        : ""
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />

                    <p className="mt-2 text-[10px] font-bold leading-4 text-(--color-text-primary) sm:text-[11px]">
                      {point.title}
                    </p>

                    <p className="mt-0.5 text-[9px] leading-4 text-(--color-text-muted) sm:text-[9.5px]">
                      {point.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <HeroShowcase heroImage={hero.image} />
      </div>
    </section>
  );
}