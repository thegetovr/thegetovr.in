import CategoryForm from "@/components/admin/categories/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Add Category
        </h1>

        <p className="mt-2 text-zinc-400">
          Create a new category for your store.
        </p>
      </div>

      <CategoryForm mode="create" />
    </div>
  );
}