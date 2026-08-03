import { Category } from "@/types/category";

import CategoryRowActions from "./CategoryRowActions";
import CategoryStatusBadge from "./CategoryStatusBadge";
import CategoryTableEmptyState from "./CategoryTableEmptyState";
import { CATEGORY_TABLE_COLUMNS } from "./categoryTableColumns";

interface CategoryTableProps {
  categories: Category[];
}

export default function CategoryTable({
  categories,
}: CategoryTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-zinc-900">
            <tr>
              {CATEGORY_TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 ${
                    column.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {categories.length === 0 ? (
              <CategoryTableEmptyState
                colSpan={CATEGORY_TABLE_COLUMNS.length}
              />
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-zinc-900/40"
                >
                  <td className="px-6 py-4 font-medium text-zinc-100">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    {category.slug}
                  </td>

                  <td className="px-6 py-4">
                    <CategoryStatusBadge
                      status={category.status}
                    />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <CategoryRowActions
                      categoryId={category.id}
                    />
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