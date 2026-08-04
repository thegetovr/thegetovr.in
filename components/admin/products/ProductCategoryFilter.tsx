import { Category } from "@/types/category";
import { ProductCategory } from "@/types/product";

interface ProductCategoryFilterProps {
  categories: Category[];
  defaultValue?: ProductCategory | "";
}

export default function ProductCategoryFilter({
  categories,
  defaultValue = "",
}: ProductCategoryFilterProps) {
  return (
    <select
      name="category"
      defaultValue={defaultValue}
      className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-zinc-700 focus:outline-none"
    >
      <option value="">All Categories</option>

      {categories.map((category) => (
        <option
          key={category.id}
          value={category.name}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}