import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  image: string;
  link: string;
};

export default function CategoryCard({
  title,
  subtitle,
  image,
  link,
}: Props) {
  return (
    <Link
      href={link}
      className="group block overflow-hidden border border-(--color-border) bg-(--color-surface)"
    >
      <div className="relative aspect-[1.18/1] overflow-hidden bg-(--color-surface-muted)">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
      </div>

      <div className="flex min-h-[68px] items-center justify-between gap-3 bg-(--color-surface-muted) px-3.5 py-3 sm:min-h-[72px] sm:px-4">
        <div className="min-w-0">
          <h3 className="text-[15px] font-black uppercase leading-none tracking-[-0.025em] text-(--color-text-primary) sm:text-[17px]">
            {title}
          </h3>

          <p className="mt-2 text-[9px] leading-3 text-(--color-text-muted) sm:text-[10px]">
            {subtitle}
          </p>
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-text-primary) text-(--color-white) transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight size={14} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}
