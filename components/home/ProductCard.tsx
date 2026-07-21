import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  price: string;
};

export default function ProductCard({ title, price }: Props) {
  return (
    <Link
      href="/shop"
      className="group overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
    >
      {/* Product Area */}

      <div className="relative flex h-[340px] items-center justify-center overflow-hidden">

        {/* Glow */}
        <div className="absolute h-56 w-56 rounded-full bg-white/[0.04] blur-[90px]" />

        {/* Placeholder */}
        <div className="relative h-52 w-40 rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-800 to-black shadow-[0_40px_80px_rgba(0,0,0,0.7)]">

          <div className="absolute left-1/2 top-6 h-12 w-12 -translate-x-1/2 rounded-full border border-white/10 bg-white/5" />

        </div>

      </div>

      {/* Details */}

      <div className="border-t border-white/10 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-bold">
              {title}
            </h3>

            <p className="mt-2 text-gray-400">
              Starting from
            </p>

          </div>

          <div className="text-right">

            <p className="text-2xl font-bold">
              ₹{price}
            </p>

          </div>

        </div>

        <div className="mt-6 flex items-center gap-2 text-white">

          View Product

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />

        </div>

      </div>

    </Link>
  );
}