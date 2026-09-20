import Link from "next/link";

import { getHomeContent } from "@/lib/homeService";
import { getProducts, getProductsByIds } from "@/lib/productService";
import { getProductReviewSummaries } from "@/lib/reviewService";
import Reveal from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import ProductCard from "./ProductCard";

export default async function BestSellers() {
  const homeContent = await getHomeContent();

  if (!homeContent) {
    return null;
  }

  const productIds = homeContent.featuredProducts?.productIds ?? [];

  const displayProducts =
    productIds.length > 0
      ? (await getProductsByIds(productIds)).filter(
          (product) => product.status === "active",
        )
      : await getProducts({ status: "active" });

  if (displayProducts.length === 0) {
    return null;
  }

  const featuredProducts = displayProducts.slice(0, 5);

  const reviewSummaries = await getProductReviewSummaries(
    featuredProducts.map((product) => product.id),
  );

  return (
    <section className="bg-(--color-surface) px-5 py-16 sm:px-7 sm:py-20 lg:px-[5vw] lg:py-24">
      <div className="mx-auto w-full max-w-[1680px]">
        <Reveal y={10} duration={0.55}>
          <header className="border-b border-(--color-border) pb-6 sm:pb-7">
            <div className="flex items-end justify-between gap-8">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-(--color-text-primary)" />

                  <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-(--color-text-muted) sm:text-[10px]">
                    {homeContent.featuredProducts.heading}
                  </p>
                </div>

                <h2 className="mt-4 font-(--font-editorial) text-[38px] font-normal leading-[0.98] tracking-[-0.045em] text-(--color-text-primary) sm:text-[48px] lg:text-[56px]">
                  {homeContent.featuredProducts.subheading}
                </h2>
              </div>

              <Link
                href="/shop"
                className="
                  group
                  hidden
                  items-center
                  gap-3
                  border-b
                  border-(--color-text-primary)
                  pb-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-(--color-text-primary)
                  transition-opacity
                  hover:opacity-60
                  sm:inline-flex
                "
              >
                <span>View all products</span>

                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </header>
        </Reveal>

        <Stagger
          className="
            mt-9
            grid
            grid-cols-2
            gap-x-3
            gap-y-10
            sm:mt-10
            sm:gap-x-5
            sm:gap-y-12
            lg:grid-cols-6
            lg:items-start
            lg:gap-x-4
            lg:gap-y-0
            xl:gap-x-5
          "
          stagger={0.08}
        >
          {featuredProducts.map((product, index) => (
            <StaggerItem
              key={product.id}
              className={
                index === 0
                  ? "col-span-2 lg:col-span-2"
                  : "col-span-1 lg:col-span-1"
              }
            >
              <ProductCard
                product={product}
                featured={index === 0}
                index={index + 1}
                reviewSummary={reviewSummaries[product.id]}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 flex items-center justify-between border-t border-(--color-border) pt-4 sm:hidden">
          <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-(--color-text-muted)">
            {featuredProducts.length} selected pieces
          </span>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-(--color-text-primary)"
          >
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}