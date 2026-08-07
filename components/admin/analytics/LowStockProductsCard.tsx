import type { Product } from "@/types/product";

type LowStockProductsCardProps = {
  products: Product[];
};

export default function LowStockProductsCard({
  products,
}: LowStockProductsCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white">
        Low Stock Products
      </h2>

      <div className="mt-6 space-y-4">
        {products.length === 0 ? (
          <p className="text-sm text-zinc-400">
            No product data available.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-none last:pb-0"
            >
              <div>
                <p className="font-medium text-white">
                  {product.name}
                </p>

                <p className="text-sm text-zinc-500">
                  SKU: {product.sku}
                </p>
              </div>

              <p className="font-semibold text-white">
                {product.stock} remaining
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}