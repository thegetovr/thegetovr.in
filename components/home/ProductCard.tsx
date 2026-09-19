import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  price: string;
};

const productImages: Record<string, string> = {
  "Premium Hoodie": "/images/home/hero-premium-hoodie.png",
  "Oversized Tee": "/images/home/hero-oversized-tee.png",
  "Regular Tee": "/images/home/hero-regular-tee.png",
};

export default function ProductCard({ title, price }: Props) {
  const imageSrc = productImages[title];

  return (
    <Link
      href="/shop"
      className="group block transition-transform duration-500 ease-out hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative flex h-[420px] items-center justify-center overflow-hidden bg-(--color-surface-muted)">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-accent)/8 blur-[100px] transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" />

        {/* Product Image */}
        <Image
          src={imageSrc}
          alt={title}
          width={700}
          height={1000}
          className="relative h-[88%] w-[78%] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />

        {/* View Icon */}
        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) opacity-0 shadow-sm transition-all duration-400 ease-out group-hover:translate-x-0.5 group-hover:opacity-100">
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>

      {/* Product Information */}
      <div className="mt-6 border-t border-(--color-border) pt-5">
        <div className="flex items-start justify-between gap-6">
          <div className="transition-transform duration-500 ease-out group-hover:translate-x-0.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-(--color-text-muted)">
              The Getovr
            </p>

            <h3 className="mt-2 font-(--font-editorial) text-2xl font-normal text-(--color-text-primary)">
              {title}
            </h3>

            <p className="mt-2 text-sm text-(--color-text-muted)">
              Starting from
            </p>
          </div>

          <p className="pt-4 text-lg font-semibold text-(--color-text-primary) transition-transform duration-500 group-hover:-translate-x-0.5">
            ₹{price}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-5 text-sm font-medium text-(--color-text-primary)">
          View Product
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
