import CategoryCard from "./CategoryCard";

export default function Categories() {
  return (
    <section className="bg-(--color-surface-muted) py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-(--color-text-muted)">
            Shop By Category
          </p>

          <h2 className="mt-5 font-(--font-editorial) text-4xl font-normal leading-tight text-(--color-text-primary) sm:text-5xl lg:text-6xl">
            Find Your Perfect Fit
          </h2>

          <p className="mt-6 text-lg leading-8 text-(--color-text-secondary)">
            Premium apparel crafted for creators, brands and everyday wear.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <CategoryCard
            large
            title="Hoodies"
            subtitle="Heavyweight hoodies built for comfort, warmth and customization."
          />

          <div className="grid gap-8">
            <CategoryCard
              title="Oversized"
              subtitle="Relaxed streetwear silhouettes made to stand out."
            />

            <CategoryCard
              title="Regular Tees"
              subtitle="Timeless everyday essentials ready for your designs."
            />
          </div>
        </div>
      </div>
    </section>
  );
}