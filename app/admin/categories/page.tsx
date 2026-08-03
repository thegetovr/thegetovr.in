import Link from "next/link";

import CategoryTable from "@/components/admin/categories/CategoryTable";
import CategoryToolbar from "@/components/admin/categories/CategoryToolbar";
import { getCategories } from "@/lib/categoryService";
import { CategoryStatus } from "@/types/category";

interface CategoriesPageProps {
  searchParams: Promise<{
    search?: string;
    status?: CategoryStatus;
  }>;
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const status = params.status ?? "";

  const categories = await getCategories({
    search,
    status,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Categories
          </h1>

          <p className="mt-2 text-zinc-400">
            Organize your products into categories.
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          + Add Category
        </Link>
      </div>

      <CategoryToolbar
        defaultSearch={search}
        defaultStatus={status}
      />

      <CategoryTable categories={categories} />
    </div>
  );
}