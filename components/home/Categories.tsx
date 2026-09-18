import Link from "next/link";
import CategoryCard from "./CategoryCard";

import Reveal from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

const categories = [
  {
    title: "T-SHIRTS",
    subtitle: "Everyday essentials",
    image: "/images/home/categories/tshirts.webp",
  },
  {
    title: "HOODIES",
    subtitle: "Built for expression",
    image: "/images/home/categories/hoodies.webp",
  },
  {
    title: "OVERSIZED",
    subtitle: "Bigger statements",
    image: "/images/home/categories/oversized.webp",
  },
  {
    title: "COLLECTIONS",
    subtitle: "Curated drops",
    image: "/images/home/category-collections.jpg",
  },
];

export default function Categories() {
  return (
    <section className="bg-(--color-surface) px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}
        <Reveal y={20} duration={0.6}>
          <div className="mb-6 flex items-end justify-between sm:mb-7">
            <h2 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-(--color-text-primary) sm:text-3xl lg:text-[36px]">
              Shop By Category
            </h2>

            <p className="hidden pb-0.5 text-[10px] font-medium uppercase tracking-[0.3em] text-(--color-text-muted) sm:block">
              Curated Essentials
            </p>
          </div>
        </Reveal>

        {/* Category Cards */}
        <Stagger
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          stagger={0.1}
        >
          {categories.map((category) => (
            <StaggerItem key={category.title}>
              <CategoryCard {...category} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Mobile View All */}
        <Reveal delay={0.25} y={15} duration={0.5}>
          <div className="mt-5 flex justify-end sm:hidden">
            <Link
              href="/shop"
              className="text-[10px] font-bold uppercase tracking-[0.08em] text-(--color-text-primary)"
            >
              View All →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
