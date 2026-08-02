import { Product } from "@/types/product";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductTableEmptyState from "./ProductTableEmptyState";
import { PRODUCT_TABLE_COLUMNS } from "./productTableColumns";
import ProductRowActions from "./ProductRowActions";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-zinc-900">
            <tr>
              {PRODUCT_TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 ${
                    column.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {products.length === 0 ? (
              <ProductTableEmptyState
                colSpan={PRODUCT_TABLE_COLUMNS.length}
              />
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-900/40">
                  <td className="px-6 py-4 font-medium text-zinc-100">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    {product.sku}
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    ₹{product.price.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    {product.stock}
                  </td>

                  <td className="px-6 py-4">
                    <ProductStatusBadge status={product.status} />
                  </td>

                  <td className="px-6 py-4 text-right">
  <ProductRowActions productId={product.id} />
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}