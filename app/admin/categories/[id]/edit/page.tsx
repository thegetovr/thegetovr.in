import { notFound } from "next/navigation";

import CategoryForm from "@/components/admin/categories/CategoryForm";
import { getCategory } from "@/lib/categoryService";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Edit Category
        </h1>

        <p className="mt-2 text-zinc-400">
          Update your category information.
        </p>
      </div>

      <CategoryForm
        mode="edit"
        category={category}
      />
    </div>
  );
}