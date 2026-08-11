import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  reviewSummary?: {
    averageRating: number;
    reviewCount: number;
  };
}

export default function ProductCard({
  product,
  reviewSummary,
}: ProductCardProps) {
  const coverImage =
    product.media.find((image) => image.isCover) ?? product.media[0];

  const productHref = `/shop/${product.id}`;

  return (
    <article className="group">
      <Link href={productHref} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt || product.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">
              No Image
            </div>
          )}

          <div className="absolute left-3 top-3">
            <span
              className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur ${
                product.type === "customizable"
                  ? "bg-white/90 text-zinc-900 dark:bg-zinc-950/90 dark:text-white"
                  : "bg-black/85 text-white"
              }`}
            >
              {product.type === "customizable" ? "Custom" : "Ready"}
            </span>
          </div>
        </div>
      </Link>

      <div className="mb-2 flex items-center justify-between gap-2">
  <p className="min-w-0 truncate text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400 sm:text-xs sm:tracking-[0.16em]">
    {product.category}
  </p>

  <span
    className={`shrink-0 text-[10px] font-medium sm:text-xs ${
      product.stock > 0
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-red-500 dark:text-red-400"
    }`}
  >
    {product.stock > 0 ? "In stock" : "Sold out"}
  </span>
</div>

        <Link href={productHref} className="block">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 tracking-tight text-zinc-950 transition-colors
           group-hover:text-zinc-600 dark:text-white dark:group-hover:text-zinc-300 sm:text-lg sm:leading-6">
            {product.name}
          </h3>
        </Link>

        {reviewSummary && reviewSummary.reviewCount > 0 ? (
          <div
            className="mt-2 flex items-center gap-2 text-xs"
            aria-label={`${reviewSummary.averageRating} out of 5 stars, ${reviewSummary.reviewCount} reviews`}
          >
            <span className="tracking-wide text-amber-500" aria-hidden="true">
              {"★".repeat(Math.round(reviewSummary.averageRating))}
              {"☆".repeat(5 - Math.round(reviewSummary.averageRating))}
            </span>

            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {reviewSummary.averageRating.toFixed(1)}
            </span>

            <span className="text-zinc-400">({reviewSummary.reviewCount})</span>
          </div>
        ) : (
          <p className="mt-2 text-xs text-zinc-400">No reviews yet</p>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
  <p className="text-base font-bold tracking-tight text-zinc-950 dark:text-white sm:text-lg">
    ₹{product.price.toLocaleString("en-IN")}
  </p>

  <Link
    href={productHref}
    className="shrink-0 text-xs font-semibold text-zinc-950 underline-offset-4 transition hover:underline dark:text-white sm:text-sm"
  >
    View →
  </Link>
</div>
    </article>
  );
}
