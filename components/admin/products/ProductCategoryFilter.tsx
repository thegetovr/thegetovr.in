import {
  PRODUCT_CATEGORIES,
  ProductCategory,
} from "@/types/product";

interface ProductCategoryFilterProps {
  defaultValue?: ProductCategory | "";
}

export default function ProductCategoryFilter({
  defaultValue = "",
}: ProductCategoryFilterProps) {
  return (
    <select
      name="category"
      defaultValue={defaultValue}
      className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-zinc-700 focus:outline-none"
    >
      <option value="">All Categories</option>

      {PRODUCT_CATEGORIES.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  );
}