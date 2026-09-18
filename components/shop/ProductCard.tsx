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
        <div className="relative aspect-4/5 overflow-hidden rounded-md bg-(--color-surface-muted)">
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt || product.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-(--color-text-muted)">
              No Image
            </div>
          )}

          <div className="absolute left-3 top-3">
            <span
              className={`rounded-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${
                product.type === "customizable"
                  ? "border border-(--color-accent) bg-white text-(--color-text-primary)"
                  : "bg-(--color-text-primary) text-white"
              }`}
            >
              {product.type === "customizable" ? "Custom" : "Ready"}
            </span>
          </div>
        </div>
      </Link>

      <div className="mb-2 mt-3 flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-[10px] font-medium uppercase tracking-[0.14em] text-(--color-text-secondary) sm:text-xs sm:tracking-[0.16em]">
          {product.category}
        </p>

        <span
          className={`shrink-0 text-[10px] font-medium sm:text-xs ${
            product.stock > 0
              ? "text-(--color-accent)"
              : "text-(--color-error)"
          }`}
        >
          {product.stock > 0 ? "In stock" : "Sold out"}
        </span>
      </div>

      <Link href={productHref} className="block">
        <h3 className="line-clamp-2 text-sm font-semibold leading-5 tracking-tight text-(--color-text-primary) transition-colors group-hover:text-(--color-text-secondary) sm:text-lg sm:leading-6">
          {product.name}
        </h3>
      </Link>

      {reviewSummary && reviewSummary.reviewCount > 0 ? (
        <div
          className="mt-2 flex items-center gap-2 text-xs"
          aria-label={`${reviewSummary.averageRating} out of 5 stars, ${reviewSummary.reviewCount} reviews`}
        >
          <span
            className="tracking-wide text-(--color-accent)"
            aria-hidden="true"
          >
            {"★".repeat(Math.round(reviewSummary.averageRating))}
            {"☆".repeat(5 - Math.round(reviewSummary.averageRating))}
          </span>

          <span className="font-medium text-(--color-text-secondary)">
            {reviewSummary.averageRating.toFixed(1)}
          </span>

          <span className="text-(--color-text-muted)">
            ({reviewSummary.reviewCount})
          </span>
        </div>
      ) : (
        <p className="mt-2 text-xs text-(--color-text-muted)">
          No reviews yet
        </p>
      )}

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-base font-bold tracking-tight text-(--color-text-primary) sm:text-lg">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <Link
          href={productHref}
          className="shrink-0 text-xs font-semibold text-(--color-text-primary) underline-offset-4 transition-colors hover:text-(--color-text-secondary) hover:underline sm:text-sm"
        >
          View →
        </Link>
      </div>
    </article>
  );
}