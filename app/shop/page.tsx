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
    <main className="container mx-auto px-4 py-10">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold">Shop</h1>
        <p className="text-muted-foreground">Explore our latest collection.</p>
      </div>
      <ShopToolbar
        search={params.search ?? ""}
        category={params.category ?? ""}
        sort={params.sort ?? "latest"}
        categories={categories}
      />

      <ProductGrid products={products} />
    </main>
  );
}
