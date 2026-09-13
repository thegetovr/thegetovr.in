import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  number: string;
  title: string;
  subtitle: string;
  image: string;
};

export default function CategoryCard({
  number,
  title,
  subtitle,
  image,
}: Props) {
  return (
    <Link
      href="/shop"
      className="group block"
    >
      {/* Product Image */}
     <div className="relative aspect-[4/5] overflow-hidden border-y border-(--color-border) bg-(--color-page)">
  <div className="absolute inset-0 bg-(--color-accent)/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

  <Image
    src={image}
    alt={title}
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    className="object-contain mix-blend-multiply p-4 transition-transform duration-700 group-hover:scale-105 sm:p-6 lg:p-8"
  />

  <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) opacity-0 transition-all duration-300 group-hover:opacity-100">
    <ArrowUpRight size={17} />
  </div>
</div>

      {/* Information */}
      <div className="pt-5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium tracking-[0.3em] text-(--color-text-muted)">
            {number}
          </span>

          <span className="h-px w-8 bg-(--color-border)" />

          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-(--color-text-muted)">
            Category
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-5">
          <div>
            <h3 className="font-(--font-editorial) text-3xl font-normal leading-tight text-(--color-text-primary)">
              {title}
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-(--color-text-secondary)">
              {subtitle}
            </p>
          </div>

          <span className="mt-1 shrink-0 text-sm font-medium text-(--color-text-primary)">
            Explore
          </span>
        </div>

        <div className="mt-6 h-px w-0 bg-(--color-text-primary) transition-all duration-500 group-hover:w-full" />
      </div>
    </Link>
  );
}