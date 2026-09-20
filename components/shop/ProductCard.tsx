import Image from "next/image";
import Link from "next/link";

import WishlistButton from "@/components/wishlist/WishlistButton";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  reviewSummary?: {
    averageRating: number;
    reviewCount: number;
  };
}

function getCategoryLabel(category: string) {
  const value = category.trim().toLowerCase();

  if (value.includes("tshirt") || value.includes("t-shirt")) return "T-SHIRT";
  if (value.includes("hoodie")) return "HOODIE";
  if (value.includes("oversized")) return "OVERSIZED";
  if (value.includes("collection")) return "COLLECTION";

  return category.trim().toUpperCase();
}

export default function ProductCard({
  product,
  reviewSummary,
}: ProductCardProps) {
  const coverImage =
    product.media.find((image) => image.isCover) ?? product.media[0];

  const productHref = `/shop/${product.id}`;
  const category = getCategoryLabel(product.category);
  const isSoldOut = product.stock <= 0;

  return (
    <article className="group min-w-0">
      <div className="relative">
        <Link href={productHref} className="block">
          <div className="relative aspect-4/5 overflow-hidden rounded-md bg-(--color-surface-muted)">
            {coverImage ? (
              <Image
                src={coverImage.url}
                alt={coverImage.alt || product.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-(--color-text-muted)">
                No Image
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 border border-black/[0.035]" />

            {isSoldOut && (
              <span className="absolute bottom-3 left-3 text-[8px] font-medium uppercase tracking-[0.16em] text-(--color-error)">
                Sold out
              </span>
            )}
          </div>
        </Link>

        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <WishlistButton productId={product.id} size="sm" />
        </div>
      </div>

      <div className="mb-2 mt-3">
        <p className="truncate text-[9px] font-medium uppercase tracking-[0.17em] text-(--color-text-secondary) sm:text-[10px]">
          {category}
        </p>
      </div>

      <Link href={productHref} className="block">
        <h3 className="line-clamp-2 text-sm font-medium leading-5 tracking-[-0.01em] text-(--color-text-primary) transition-colors group-hover:text-(--color-text-secondary) sm:text-base sm:leading-6">
          {product.name}
        </h3>
      </Link>

      {reviewSummary && reviewSummary.reviewCount > 0 && (
        <div
          className="mt-2 flex items-center gap-2 text-xs"
          aria-label={`${reviewSummary.averageRating} out of 5 stars, ${reviewSummary.reviewCount} reviews`}
        >
          <span className="text-(--color-accent)" aria-hidden="true">
            ★
          </span>

          <span className="font-medium text-(--color-text-secondary)">
            {reviewSummary.averageRating.toFixed(1)}
          </span>

          <span className="text-(--color-text-muted)">
            ({reviewSummary.reviewCount})
          </span>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-base font-medium tracking-tight text-(--color-text-primary) sm:text-lg">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <Link
          href={productHref}
          className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-(--color-text-primary) underline-offset-4 transition-colors hover:text-(--color-text-secondary) hover:underline sm:text-xs"
        >
          View →
        </Link>
      </div>
    </article>
  );
}
