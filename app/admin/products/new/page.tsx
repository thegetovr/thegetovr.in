import ProductForm from "@/components/admin/products/ProductForm";
import { getActiveCategories } from "@/lib/categoryService";

export default async function NewProductPage() {
  const categories = await getActiveCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Add Product
        </h1>

        <p className="mt-2 text-zinc-400">
          Create a new product for your store.
        </p>
      </div>

      <ProductForm
        mode="create"
        categories={categories}
      />
    </div>
  );
}