import Image from "next/image";
import type { HomeMedia } from "@/types/home";

interface HeroShowcaseProps {
  heroImage: HomeMedia | null;
}

export default function HeroShowcase({
  heroImage,
}: HeroShowcaseProps) {
  return (
    <div className="group relative min-h-[390px] overflow-hidden bg-(--color-charcoal-900) sm:min-h-[450px] lg:min-h-[500px]">
      {heroImage?.url ? (
        <Image
          src={heroImage.url}
          alt={heroImage.alt}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 59vw"
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-(--color-charcoal-900) text-sm uppercase tracking-[0.2em] text-white/50">
          Hero Image
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/15" />

      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1.5 sm:bottom-10 sm:right-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">
          Ideas
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">
          Designs
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">
          People
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">
          Stories
        </span>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-1/3 bg-white/40" />
    </div>
  );
}