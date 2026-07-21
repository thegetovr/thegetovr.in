import CategoryCard from "./CategoryCard";

export default function Categories() {
  return (
    <section className="bg-[#050505] py-28">

      <div className="mx-auto max-w-7xl px-8">

        <div className="mb-16">

          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
            Shop By Category
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Find Your Perfect Fit
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-gray-400">
            Premium apparel crafted for creators,
            brands and everyday wear.
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