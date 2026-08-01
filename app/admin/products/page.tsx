import ProductTable from "@/components/admin/products/ProductTable";
import ProductToolbar from "@/components/admin/products/ProductToolbar";
import { getProducts } from "@/lib/productService";
import {
  ProductCategory,
  ProductStatus,
} from "@/types/product";

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

  const products = await getProducts({
  search,
  category,
  status,
});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Products</h1>

        <p className="mt-2 text-zinc-400">
          Manage your store products, inventory, and product information.
        </p>
      </div>

      <ProductToolbar
        defaultSearch={search}
        defaultCategory={category}
        defaultStatus={status}
      />

      <ProductTable products={products} />
    </div>
  );
}