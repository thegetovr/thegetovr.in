import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

import WishlistButton from "@/components/wishlist/WishlistButton";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  featured?: boolean;
  index?: number;
  reviewSummary?: {
    averageRating: number;
    reviewCount: number;
  };
};

function getCoverImage(product: Product) {
  return (
    product.media.find((media) => media.isCover)?.url ??
    product.media[0]?.url ??
    "/images/home/hero-oversized-tee.png"
  );
}

function getSecondaryImage(product: Product) {
  const cover = getCoverImage(product);

  return (
    [...product.media]
      .sort((a, b) => a.order - b.order)
      .find((media) => media.url !== cover)?.url ?? null
  );
}

function getCoverAlt(product: Product) {
  return (
    product.media.find((media) => media.isCover)?.alt ??
    product.media[0]?.alt ??
    product.name
  );
}

function getCategoryLabel(category: string) {
  const value = category.trim().toLowerCase();

  if (value.includes("tshirt") || value.includes("t-shirt")) return "T-SHIRT";
  if (value.includes("hoodie")) return "HOODIE";
  if (value.includes("oversized")) return "OVERSIZED";
  if (value.includes("collection")) return "COLLECTION";

  return category.trim().toUpperCase();
}

function getColors(product: Product) {
  return [
    ...new Set(
      product.variants
        .map((variant) => variant.color?.trim())
        .filter(Boolean),
    ),
  ].slice(0, 4);
}

function getSizes(product: Product) {
  return [
    ...new Set(
      product.variants
        .map((variant) => variant.size?.trim())
        .filter(Boolean),
    ),
  ];
}

function getColorStyle(color: string) {
  const value = color.toLowerCase();

  if (value.includes("black")) return "#171717";
  if (value.includes("white")) return "#f5f4ef";
  if (value.includes("cream")) return "#e7ddce";
  if (value.includes("beige")) return "#cbbca5";
  if (value.includes("grey") || value.includes("gray")) return "#8d8d89";
  if (value.includes("green")) return "#65725f";
  if (value.includes("olive")) return "#72745c";
  if (value.includes("brown")) return "#735c49";
  if (value.includes("blue")) return "#596f88";
  if (value.includes("navy")) return "#303d51";
  if (value.includes("red")) return "#874d48";

  return "#b8b2a8";
}

function Rating({
  reviewSummary,
  featured,
}: {
  reviewSummary?: Props["reviewSummary"];
  featured: boolean;
}) {
  if (!reviewSummary || reviewSummary.reviewCount === 0) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-1.5"
      aria-label={`${reviewSummary.averageRating} out of 5 stars, ${reviewSummary.reviewCount} reviews`}
    >
      <Star
        size={featured ? 11 : 10}
        fill="currentColor"
        strokeWidth={1.2}
        className="text-(--color-accent)"
      />

      <span className="text-[10px] font-medium text-(--color-text-primary)">
        {reviewSummary.averageRating.toFixed(1)}
      </span>

      <span className="text-[10px] text-(--color-text-muted)">
        · {reviewSummary.reviewCount}{" "}
        {reviewSummary.reviewCount === 1 ? "review" : "reviews"}
      </span>
    </div>
  );
}

function ColorSwatches({
  colors,
  featured = false,
}: {
  colors: string[];
  featured?: boolean;
}) {
  if (colors.length === 0) {
    return null;
  }

  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Available colors: ${colors.join(", ")}`}
    >
      {colors.map((color) => (
        <span
          key={color}
          title={color}
          className={
            featured
              ? "h-3 w-3 rounded-full border border-black/10"
              : "h-2.5 w-2.5 rounded-full border border-black/10"
          }
          style={{ backgroundColor: getColorStyle(color) }}
        />
      ))}
    </div>
  );
}

function SizeList({ sizes }: { sizes: string[] }) {
  if (sizes.length === 0) {
    return null;
  }

  return (
    <span className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-(--color-text-muted)">
      {sizes.join(" · ")}
    </span>
  );
}

export default function ProductCard({
  product,
  featured = false,
  index = 1,
  reviewSummary,
}: Props) {
  const coverImage = getCoverImage(product);
  const secondaryImage = getSecondaryImage(product);
  const colors = getColors(product);
  const sizes = getSizes(product);

  const productHref = `/shop/${product.id}`;
  const category = getCategoryLabel(product.category);
  const isSoldOut = product.stock <= 0;

  if (featured) {
    return (
      <article className="group min-w-0">
        <div className="relative">
          <Link
            href={productHref}
            className="block"
            aria-label={`View ${product.name}`}
          >
            <div className="relative aspect-[1.08/1] overflow-hidden bg-(--color-surface-muted) lg:aspect-[1.16/1]">
              <Image
                src={coverImage}
                alt={getCoverAlt(product)}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 34vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              />

              {secondaryImage && (
                <Image
                  src={secondaryImage}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 34vw"
                  className="pointer-events-none object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

              <span className="absolute left-4 top-4 text-[9px] font-medium tracking-[0.18em] text-white/90">
                {String(index).padStart(2, "0")}
              </span>

              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-5">
                <div className="min-w-0 text-white">
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">
                    {category}
                  </p>

                  <h3 className="mt-1.5 truncate text-[21px] font-medium leading-[1.05] tracking-[-0.025em]">
                    {product.name}
                  </h3>
                </div>

                <p className="shrink-0 text-[14px] font-medium text-white">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </Link>

          <div className="absolute right-4 top-4 z-10">
            <WishlistButton productId={product.id} size="sm" />
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4">
            <Rating reviewSummary={reviewSummary} featured />

            <ColorSwatches colors={colors} featured />

            <div className="hidden lg:block">
              <SizeList sizes={sizes} />
            </div>
          </div>

          <Link
            href={productHref}
            className="group/explore inline-flex shrink-0 items-center gap-2 border-b border-(--color-text-primary) pb-1 text-[9px] font-medium uppercase tracking-[0.17em] text-(--color-text-primary)"
          >
            Explore
            <ArrowUpRight
              size={11}
              strokeWidth={1.25}
              className="transition-transform duration-300 group-hover/explore:translate-x-0.5 group-hover/explore:-translate-y-0.5"
            />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group min-w-0">
      <div className="relative">
        <Link
          href={productHref}
          className="block"
          aria-label={`View ${product.name}`}
        >
          <div className="relative aspect-[0.84/1] overflow-hidden bg-(--color-surface-muted)">
            <Image
              src={coverImage}
              alt={getCoverAlt(product)}
              fill
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 17vw"
              className="object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
            />

            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt=""
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 17vw"
                className="pointer-events-none object-contain opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            )}

            <div className="pointer-events-none absolute inset-0 border border-black/[0.045] transition-colors duration-500 group-hover:border-black/[0.12]" />

            <span className="absolute left-3 top-3 text-[8px] font-medium tracking-[0.15em] text-(--color-text-muted) sm:left-4 sm:top-4">
              {String(index).padStart(2, "0")}
            </span>

            <span
              className="absolute bottom-3 right-3 inline-flex h-8 translate-y-2 items-center gap-1.5 rounded-full border border-black/[0.07] bg-white/90 px-3 text-[8px] font-medium uppercase tracking-[0.14em] text-(--color-text-primary) opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-4 sm:right-4"
              aria-hidden="true"
            >
              View
              <ArrowUpRight size={10} strokeWidth={1.2} />
            </span>
          </div>
        </Link>

        <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
          <WishlistButton productId={product.id} size="sm" />
        </div>
      </div>

      <div className="pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.17em] text-(--color-text-secondary)">
              {category}
            </p>

            <h3 className="mt-1.5 line-clamp-2 text-[14px] font-medium leading-[1.2] tracking-[-0.015em] text-(--color-text-primary)">
              {product.name}
            </h3>
          </div>

          <p className="shrink-0 text-[13px] font-medium tracking-[-0.01em] text-(--color-text-primary)">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="mt-2.5 flex min-h-[18px] items-center justify-between gap-3">
          <Rating reviewSummary={reviewSummary} featured={false} />
          <ColorSwatches colors={colors} />
        </div>

        {sizes.length > 0 && (
          <div className="mt-2.5 border-t border-(--color-border) pt-2.5">
            <SizeList sizes={sizes} />
          </div>
        )}

        {isSoldOut && (
          <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.15em] text-(--color-error)">
            Sold out
          </p>
        )}
      </div>
    </article>
  );
}
