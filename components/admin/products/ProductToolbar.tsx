import {
  ProductCategory,
  ProductStatus,
} from "@/types/product";

import ProductCategoryFilter from "./ProductCategoryFilter";
import ProductSearch from "./ProductSearch";
import ProductStatusFilter from "./ProductStatusFilter";

interface ProductToolbarProps {
  defaultSearch?: string;
  defaultCategory?: ProductCategory | "";
  defaultStatus?: ProductStatus | "";
}

export default function ProductToolbar({
  defaultSearch = "",
  defaultCategory = "",
  defaultStatus = "",
}: ProductToolbarProps) {
  return (
    <form
      method="GET"
      className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <ProductSearch defaultValue={defaultSearch} />

        <ProductCategoryFilter defaultValue={defaultCategory} />

        <ProductStatusFilter defaultValue={defaultStatus} />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Apply
        </button>

        <a
          href="/admin/products"
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          Reset
        </a>
      </div>
    </form>
  );
}