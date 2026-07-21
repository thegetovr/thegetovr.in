import ProductCard from "./ProductCard";

export default function BestSellers() {
  return (
    <section className="bg-[#050505] py-28">

      <div className="mx-auto max-w-7xl px-8">

        <div className="mb-16 flex items-end justify-between">

          <div>

            <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
              Best Sellers
            </p>

            <h2 className="mt-4 text-5xl font-black">
              Made To Stand Out
            </h2>

            <p className="mt-6 max-w-2xl text-lg text-gray-400">
              Premium apparel loved by creators,
              businesses and everyday wearers.
            </p>

          </div>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          <ProductCard
            title="Premium Hoodie"
            price="899"
          />

          <ProductCard
            title="Oversized Tee"
            price="699"
          />

          <ProductCard
            title="Regular Tee"
            price="599"
          />

        </div>

      </div>

    </section>
  );
}