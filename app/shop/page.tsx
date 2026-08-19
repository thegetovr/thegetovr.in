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
    <main className="min-h-screen bg-(--color-page) text-(--color-text-primary)">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pb-14 lg:pt-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-(--color-text-secondary)">
            The Getovr Collection
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-(--color-text-primary) sm:text-5xl lg:text-6xl">
            Discover pieces
            <br />
            made to be yours.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-(--color-text-secondary) sm:text-lg">
            Explore our latest collection of ready-made and customizable
            pieces designed for your everyday style.
          </p>
        </div>

        <div className="border-y border-(--color-border) py-5">
          <ShopToolbar
            search={params.search ?? ""}
            category={params.category ?? ""}
            sort={params.sort ?? "latest"}
            categories={categories}
          />
        </div>

        <div className="mb-6 mt-8 flex items-center justify-between">
          <p className="text-sm text-(--color-text-secondary)">
            {products.length}{" "}
            {products.length === 1 ? "piece" : "pieces"}
          </p>

          {params.category && (
            <p className="text-sm font-medium text-(--color-text-primary)">
              {params.category}
            </p>
          )}
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}