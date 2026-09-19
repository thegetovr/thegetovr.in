import ProductCard from "./ProductCard";

import Reveal from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export default function BestSellers() {
  return (
    <section className="bg-(--color-page) py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal y={25} duration={0.7}>
          <div className="mb-12 flex items-end justify-between gap-8 lg:mb-16">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-(--color-text-muted)">
                Best Sellers
              </p>

              <h2 className="mt-4 font-(--font-editorial) text-4xl font-normal leading-tight text-(--color-text-primary) sm:text-5xl lg:text-6xl">
                Made to stand out.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-(--color-text-secondary) sm:text-lg">
                Premium apparel loved by creators, businesses, and everyday
                wearers.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Product Cards */}
        <Stagger
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          stagger={0.12}
        >
          <StaggerItem>
            <ProductCard title="Premium Hoodie" price="899" />
          </StaggerItem>

          <StaggerItem>
            <ProductCard title="Oversized Tee" price="699" />
          </StaggerItem>

          <StaggerItem>
            <ProductCard title="Regular Tee" price="599" />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
