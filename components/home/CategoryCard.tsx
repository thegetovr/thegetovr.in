import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  large?: boolean;
};

export default function CategoryCard({
  title,
  subtitle,
  large = false,
}: Props) {
  return (
    <Link
      href="/shop"
      className={`group relative overflow-hidden rounded-(--radius-lg)
        border border-(--color-border)
        bg-(--color-surface)
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-(--shadow-elevated)
        ${
          large
            ? "min-h-[420px]"
            : "min-h-[300px]"
        }`}
    >
      {/* Editorial Product Shape */}
      <div className="absolute right-8 top-8 opacity-80 transition duration-500 group-hover:scale-105 group-hover:rotate-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-(--color-accent)/10 blur-3xl" />

          <div
            className={`relative rounded-(--radius-lg)
              border border-(--color-border)
              bg-(--color-surface-muted)
              shadow-(--shadow-soft)
              ${
                large
                  ? "h-52 w-40"
                  : "h-40 w-32"
              }`}
          >
            <div className="absolute left-1/2 top-5 h-10 w-10 -translate-x-1/2 rounded-full border border-(--color-border) bg-(--color-surface)" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-(--color-text-muted)">
            Category
          </p>

          <h3 className="mt-4 font-(--font-editorial) text-4xl font-normal text-(--color-text-primary)">
            {title}
          </h3>

          <p className="mt-4 max-w-sm leading-7 text-(--color-text-secondary)">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 font-medium text-(--color-text-primary)">
          Explore

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}