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
      className={`group relative overflow-hidden rounded-[32px]
      border border-white/10
      bg-gradient-to-br
      from-zinc-900
      via-black
      to-zinc-950
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-white/20
      ${
        large
          ? "min-h-[420px]"
          : "min-h-[300px]"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/[0.03] blur-[120px]" />

      {/* Secondary Glow */}
      <div className="absolute left-10 bottom-0 h-52 w-52 rounded-full bg-white/[0.02] blur-[90px]" />

      {/* Product Placeholder */}
      <div className="absolute right-8 top-8 opacity-70 transition duration-500 group-hover:scale-105 group-hover:rotate-3">

        <div className="relative">

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl" />

          {/* Apparel Card */}
          <div
            className={`relative rounded-[28px]
            border border-white/10
            bg-gradient-to-br
            from-zinc-800
            via-zinc-900
            to-black
            shadow-[0_30px_60px_rgba(0,0,0,0.6)]
            ${
              large
                ? "h-52 w-40"
                : "h-40 w-32"
            }`}
          >

            {/* Neck */}
            <div className="absolute left-1/2 top-5 h-10 w-10 -translate-x-1/2 rounded-full border border-white/10 bg-white/5" />

          </div>

        </div>

      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8">

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
            Category
          </p>

          <h3 className="mt-4 text-4xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-4 max-w-sm leading-7 text-gray-400">
            {subtitle}
          </p>

        </div>

        <div className="flex items-center gap-2 font-medium text-white">

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