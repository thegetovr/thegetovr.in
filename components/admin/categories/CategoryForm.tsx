import SubmitButton from "@/components/admin/common/SubmitButton";
import SelectField from "@/components/admin/forms/SelectField";
import TextField from "@/components/admin/forms/TextField";

import {
  createCategory,
  updateCategory,
} from "@/lib/categoryActions";
import { Category } from "@/types/category";

interface CategoryFormProps {
  mode: "create" | "edit";
  category?: Category;
}

export default function CategoryForm({
  mode,
  category,
}: CategoryFormProps) {
  const action =
    mode === "create"
      ? createCategory
      : updateCategory.bind(null, category!.id);

  return (
    <form
      action={action}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
    >
      <h2 className="text-xl font-semibold text-white">
        Category Information
      </h2>

      <div className="mt-6 space-y-6">
        <TextField
          id="name"
          name="name"
          label="Category Name"
          defaultValue={category?.name ?? ""}
          placeholder="Enter category name"
        />

        <TextField
          id="slug"
          name="slug"
          label="Slug"
          defaultValue={category?.slug ?? ""}
          placeholder="oversized-t-shirts"
        />

        <SelectField
          id="status"
          name="status"
          label="Status"
          defaultValue={category?.status ?? "hidden"}
          options={[
            {
              value: "active",
              label: "Live",
            },
            {
              value: "hidden",
              label: "Hidden",
            },
          ]}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <SubmitButton
          label={
            mode === "create"
              ? "Add Category"
              : "Save Changes"
          }
          pendingLabel={
            mode === "create"
              ? "Creating..."
              : "Saving..."
          }
        />
      </div>
    </form>
  );
}