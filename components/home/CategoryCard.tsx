import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  image: string;
};

export default function CategoryCard({ title, subtitle, image }: Props) {
  return (
    <Link
      href="/shop"
      className="group block overflow-hidden border border-(--color-border) bg-(--color-surface) transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-(--shadow-soft)"
    >
      {/* Image */}
      <div className="relative aspect-[1.18/1] overflow-hidden bg-(--color-surface-muted)">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />

        {/* Subtle Image Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.025]" />
      </div>

      {/* Content */}
      <div className="flex min-h-[68px] items-center justify-between gap-3 bg-(--color-surface-muted) px-3.5 py-3 sm:min-h-[72px] sm:px-4">
        <div className="min-w-0 transition-transform duration-500 ease-out group-hover:translate-x-0.5">
          <h3 className="text-[15px] font-black uppercase leading-none tracking-[-0.025em] text-(--color-text-primary) sm:text-[17px]">
            {title}
          </h3>

          <p className="mt-2 text-[9px] leading-3 text-(--color-text-muted) sm:text-[10px]">
            {subtitle}
          </p>
        </div>

        {/* Arrow */}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-text-primary) text-(--color-white) transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:scale-105">
          <ArrowRight
            size={14}
            strokeWidth={2}
            className="transition-transform duration-400 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
