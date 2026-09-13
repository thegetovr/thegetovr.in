import CategoryCard from "./CategoryCard";

export default function Categories() {
  return (
    <section className="bg-(--color-surface-muted) py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 max-w-2xl lg:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-(--color-text-muted)">
            Shop By Category
          </p>

          <h2 className="mt-5 font-(--font-editorial) text-5xl font-normal leading-[1.05] text-(--color-text-primary) sm:text-6xl">
            Find Your Perfect Fit
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-(--color-text-secondary) sm:text-lg">
            Premium apparel crafted for creators, brands and everyday wear.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          <CategoryCard
            number="01"
            title="Hoodies"
            subtitle="Heavyweight hoodies built for comfort, warmth and customization."
            image="/images/home/hero-premium-hoodie.png"
          />

          <CategoryCard
            number="02"
            title="Oversized"
            subtitle="Relaxed streetwear silhouettes made to stand out."
            image="/images/home/hero-oversized-tee.png"
          />

          <CategoryCard
            number="03"
            title="Regular Tees"
            subtitle="Timeless everyday essentials ready for your designs."
            image="/images/home/hero-regular-tee.png"
          />
        </div>
      </div>
    </section>
  );
}