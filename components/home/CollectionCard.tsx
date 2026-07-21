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
      className={`
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-gradient-to-br
        from-zinc-900
        via-black
        to-zinc-950
        p-8
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-white/20
        ${large ? "min-h-[420px]" : "min-h-[260px]"}
      `}
    >
      {/* Background Glow */}
      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/[0.03] blur-[90px]" />

      {/* Placeholder Product */}
      <div className="absolute right-10 top-10 h-40 w-32 rounded-3xl border border-white/10 bg-black shadow-2xl" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
          Collection
        </p>

        <h3 className="mt-3 text-3xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-4 max-w-sm text-gray-400">
          {description}
        </p>

        <span className="mt-8 inline-flex items-center gap-2 text-white transition-transform duration-300 group-hover:translate-x-2">
          Explore Collection →
        </span>
      </div>
    </Link>
  );
}