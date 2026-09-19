import Link from "next/link";

import { getHomeContent } from "@/lib/homeService";
import CategoryCard from "./CategoryCard";
import Reveal from "@/components/animations/Reveal";

const fallbackImages: Record<string, string> = {
  tshirts: "/images/home/categories/tshirts.webp",
  hoodies: "/images/home/categories/hoodies.webp",
  oversized: "/images/home/categories/oversized.webp",
  collections: "/images/home/category-collections.jpg",
};

export default async function Categories() {
  const homeContent = await getHomeContent();

  const categories = (homeContent?.categories ?? [])
    .filter((category) => category.enabled)
    .sort((a, b) => a.order - b.order);

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-(--color-surface) px-5 py-9 sm:px-7 sm:py-10 lg:px-[5vw] lg:py-11">
      <div className="mx-auto w-full max-w-[1680px]">
        {/* Section Heading */}
        <Reveal y={8} duration={0.5}>
          <div className="flex items-end justify-between border-b border-(--color-border) pb-4 sm:pb-5">
            <h2 className="text-[17px] font-medium uppercase leading-none tracking-[0.25em] text-(--color-text-primary) sm:text-[18px] lg:text-[19px]">
              Shop By Category
            </h2>

            <Link
              href="/shop"
              className="hidden items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] text-(--color-text-primary) transition-opacity hover:opacity-60 sm:inline-flex lg:text-[10px]"
            >
              <span>View All</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        {/* Category Cards */}
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-3">
          {categories.map((category, index) => (
            <Reveal
              key={category.id}
              y={30}
              duration={0.65}
              delay={index * 0.08}
            >
              <CategoryCard
                title={category.title}
                subtitle={category.subtitle}
                image={category.image?.url ?? fallbackImages[category.id] ?? ""}
                link={category.link}
                index={index + 1}
                id={category.id}
              />
            </Reveal>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-4 flex justify-end sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] text-(--color-text-primary)"
          >
            <span>View All</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
