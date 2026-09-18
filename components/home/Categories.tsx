import Link from "next/link";
import { getHomeContent } from "@/lib/homeService";
import CategoryCard from "./CategoryCard";

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
    <section className="bg-(--color-surface) px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-end justify-between sm:mb-7">
          <h2 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-(--color-text-primary) sm:text-3xl lg:text-[36px]">
            Shop By Category
          </h2>

          <p className="hidden pb-0.5 text-[10px] font-medium uppercase tracking-[0.3em] text-(--color-text-muted) sm:block">
            Curated Essentials
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              subtitle={category.subtitle}
              image={
                category.image?.url ??
                fallbackImages[category.id] ??
                ""
              }
              link={category.link}
            />
          ))}
        </div>

        <div className="mt-5 flex justify-end sm:hidden">
          <Link
            href="/shop"
            className="text-[10px] font-bold uppercase tracking-[0.08em] text-(--color-text-primary)"
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}