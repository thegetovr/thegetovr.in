import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CollectionCardProps = {
  title: string;
  description: string;
  large?: boolean;
};

const collectionImages: Record<string, string> = {
  "Premium Hoodies": "/images/home/hero-premium-hoodie.png",
  "Oversized Tees": "/images/home/hero-oversized-tee.png",
  "Regular Tees": "/images/home/hero-regular-tee.png",
};

const collectionNumbers: Record<string, string> = {
  "Premium Hoodies": "01",
  "Oversized Tees": "02",
  "Regular Tees": "03",
};

export default function CollectionCard({
  title,
  description,
  large = false,
}: CollectionCardProps) {
  const imageSrc = collectionImages[title];
  const number = collectionNumbers[title];

  if (large) {
    return (
      <Link
        href="/shop"
        className="group relative block overflow-hidden border-y border-(--color-border)"
      >
        {/* Background index */}
        <span className="pointer-events-none absolute -right-3 top-2 font-(--font-editorial) text-[120px] font-normal leading-none text-(--color-text-primary)/[0.025] sm:-right-4 sm:top-0 sm:text-[160px] lg:-right-6 lg:-top-12 lg:text-[220px]">
          {number}
        </span>

        {/* Mobile / Tablet Product */}
        <div className="relative flex h-[260px] items-center justify-center sm:h-[320px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%]">
          <div className="absolute h-[75%] w-[75%] rounded-full bg-(--color-accent)/5 blur-[80px] lg:blur-[100px]" />

          <Image
            src={imageSrc}
            alt={title}
            width={700}
            height={1000}
            className="relative h-[90%] w-[72%] object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-1 sm:h-[92%] sm:w-[60%] lg:h-auto lg:w-[82%]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-0 w-full flex-col justify-between px-0 py-8 sm:py-10 lg:min-h-[540px] lg:w-[46%] lg:py-12 lg:pr-8">
          <div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.3em] text-(--color-text-muted)">
                COLLECTION
              </span>

              <span className="h-px w-8 bg-(--color-border)" />

              <span className="text-xs text-(--color-text-muted)">
                {number}
              </span>
            </div>

            <h3 className="mt-6 font-(--font-editorial) text-4xl font-normal leading-[0.98] text-(--color-text-primary) sm:text-5xl lg:mt-8 lg:text-6xl">
              {title}
            </h3>

            <p className="mt-5 max-w-sm text-base leading-7 text-(--color-text-secondary) lg:mt-7 lg:text-lg">
              {description}
            </p>
          </div>

          <span className="mt-8 inline-flex items-center gap-3 font-medium text-(--color-text-primary) lg:mt-10">
            Explore Collection
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/shop"
      className="group relative flex min-h-[260px] items-center justify-between overflow-hidden border-t border-(--color-border) py-8"
    >
      <span className="pointer-events-none absolute -right-3 -top-10 font-(--font-editorial) text-[150px] font-normal leading-none text-(--color-text-primary)/[0.025]">
        {number}
      </span>

      <div className="relative z-10 max-w-[58%]">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-(--color-text-muted)">
            Collection
          </span>

          <span className="text-[10px] text-(--color-text-muted)">
            {number}
          </span>
        </div>

        <h3 className="mt-4 font-(--font-editorial) text-3xl font-normal leading-tight text-(--color-text-primary)">
          {title}
        </h3>

        <p className="mt-3 max-w-xs leading-7 text-(--color-text-secondary)">
          {description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-(--color-text-primary)">
          Explore
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>

      <div className="relative z-10 h-40 w-36 shrink-0">
        <div className="absolute inset-0 rounded-full bg-(--color-accent)/5 blur-2xl" />

        <Image
          src={imageSrc}
          alt={title}
          width={700}
          height={1000}
          className="relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2"
        />
      </div>
    </Link>
  );
}