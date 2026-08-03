import { notFound } from "next/navigation";

import CategoryActionsCard from "@/components/admin/categories/CategoryActionsCard";
import CategoryDetailsCard from "@/components/admin/categories/CategoryDetailsCard";
import { getCategory } from "@/lib/categoryService";

interface CategoryDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryDetailsPage({
  params,
}: CategoryDetailsPageProps) {
  const { id } = await params;

  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <CategoryDetailsCard category={category} />

      <CategoryActionsCard categoryId={category.id} />
    </div>
  );
}