import { notFound } from "next/navigation";
import ProductStatusBadge from "@/components/admin/products/ProductStatusBadge";
import { getProduct } from "@/lib/productService";
import ProductActionsCard from "@/components/admin/products/ProductActionsCard";
import ProductImageCard from "@/components/admin/products/media/ProductImageCard";

interface AdminProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminProductDetailsPage({
  params,
}: AdminProductDetailsPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">{product.name}</h1>

        <p className="mt-2 text-zinc-400">Product Details</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <ProductImageCard media={product.media} />
        <div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  SKU
                </dt>
                <dd className="mt-1 text-white">{product.sku}</dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  Category
                </dt>
                <dd className="mt-1 text-white">{product.category}</dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  Price
                </dt>
                <dd className="mt-1 text-white">₹{product.price}</dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  Stock
                </dt>
                <dd className="mt-1 text-white">{product.stock}</dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  Status
                </dt>
                <dd className="mt-1">
                  <ProductStatusBadge status={product.status} />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <ProductActionsCard productId={product.id} />
      </div>
    </div>
  );
}
