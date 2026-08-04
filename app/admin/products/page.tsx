import Link from "next/link";

import ProductTable from "@/components/admin/products/ProductTable";
import ProductToolbar from "@/components/admin/products/ProductToolbar";
import { getProducts } from "@/lib/productService";
import { ProductCategory, ProductStatus } from "@/types/product";
import { getActiveCategories } from "@/lib/categoryService";

interface AdminProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: ProductCategory;
    status?: ProductStatus;
  }>;
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const category = params.category ?? "";
  const status = params.status ?? "";

  const [products, categories] = await Promise.all([
    getProducts({
      search,
      category,
      status,
    }),
    getActiveCategories(),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Products</h1>

          <p className="mt-2 text-zinc-400">
            Manage your store products, inventory, and product information.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          + Add Product
        </Link>
      </div>

      <ProductToolbar
  categories={categories}
  defaultSearch={search}
  defaultCategory={category}
  defaultStatus={status}
/>

      <ProductTable products={products} />
    </div>
  );
}
