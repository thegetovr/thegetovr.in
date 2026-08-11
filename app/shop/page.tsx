import { getProducts } from "@/lib/productService";
import ProductGrid from "@/components/shop/ProductGrid";
import ShopToolbar from "@/components/shop/ShopToolbar";
import { getActiveCategories } from "@/lib/categoryService";

interface ShopPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: "latest" | "price-low" | "price-high";
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({
      status: "active",
      search: params.search,
      category: params.category,
      sort: params.sort,
    }),
    getActiveCategories(),
  ]);

  return (
    <main className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pb-14 lg:pt-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
            The Getovr Collection
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Discover pieces
            <br />
            made to be yours.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Explore our latest collection of ready-made and customizable
            pieces designed for your everyday style.
          </p>
        </div>

        <div className="border-y border-zinc-200 py-5 dark:border-zinc-800">
          <ShopToolbar
            search={params.search ?? ""}
            category={params.category ?? ""}
            sort={params.sort ?? "latest"}
            categories={categories}
          />
        </div>

        <div className="mt-8 mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {products.length}{" "}
            {products.length === 1 ? "piece" : "pieces"}
          </p>

          {params.category && (
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {params.category}
            </p>
          )}
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}