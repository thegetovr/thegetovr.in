import Link from "next/link";

type CollectionCardProps = {
  title: string;
  description: string;
  large?: boolean;
};

export default function CollectionCard({
  title,
  description,
  large = false,
}: CollectionCardProps) {
  return (
    <Link
      href="/shop"
      className={`group relative block overflow-hidden rounded-(--radius-lg)
        border border-(--color-border)
        bg-(--color-surface)
        p-8
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-(--shadow-elevated)
        ${large ? "min-h-[420px]" : "min-h-[260px]"}`}
    >
      {/* Product Shape */}
      <div
        className={`absolute right-8 top-8
          rounded-(--radius-lg)
          border border-(--color-border)
          bg-(--color-surface-muted)
          shadow-(--shadow-soft)
          transition-transform duration-500
          group-hover:scale-105
          group-hover:rotate-2
          ${large ? "h-48 w-36" : "h-36 w-28"}`}
      >
        <div className="absolute left-1/2 top-5 h-9 w-9 -translate-x-1/2 rounded-full border border-(--color-border) bg-(--color-surface)" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-(--color-text-muted)">
          Collection
        </p>

        <h3 className="mt-4 font-(--font-editorial) text-3xl font-normal text-(--color-text-primary)">
          {title}
        </h3>

        <p className="mt-4 max-w-sm leading-7 text-(--color-text-secondary)">
          {description}
        </p>

        <span className="mt-8 inline-flex items-center gap-2 font-medium text-(--color-text-primary) transition-transform duration-300 group-hover:translate-x-1">
          Explore Collection
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}