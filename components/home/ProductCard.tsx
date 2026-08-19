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
      className="group overflow-hidden rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) transition-all duration-500 hover:-translate-y-1 hover:shadow-(--shadow-elevated)"
    >
      {/* Product Area */}
      <div className="relative flex h-[340px] items-center justify-center overflow-hidden bg-(--color-surface-muted)">
        <div className="absolute h-56 w-56 rounded-full bg-(--color-accent)/10 blur-[90px]" />

        <div className="relative h-52 w-40 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) shadow-(--shadow-elevated)">
          <div className="absolute left-1/2 top-6 h-12 w-12 -translate-x-1/2 rounded-full border border-(--color-border) bg-(--color-surface-muted)" />
        </div>
      </div>

      {/* Details */}
      <div className="border-t border-(--color-border) p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-(--font-editorial) text-2xl font-normal text-(--color-text-primary)">
              {title}
            </h3>

            <p className="mt-2 text-(--color-text-muted)">
              Starting from
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-(--color-text-primary)">
              ₹{price}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 font-medium text-(--color-text-primary)">
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