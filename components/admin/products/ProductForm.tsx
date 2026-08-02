import SelectField from "@/components/admin/forms/SelectField";
import TextField from "@/components/admin/forms/TextField";
import SubmitButton from "@/components/admin/common/SubmitButton";

import {
  createProduct,
  updateProduct,
} from "@/lib/productActions";
import { Product } from "@/types/product";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
}

export default function ProductForm({
  mode,
  product,
}: ProductFormProps) {
  const action =
    mode === "create"
      ? createProduct
      : updateProduct.bind(null, product!.id);

  return (
    <form
      action={action}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
    >
      <h2 className="text-xl font-semibold text-white">
        Product Information
      </h2>

      <div className="mt-6 space-y-6">
        <TextField
          id="name"
          name="name"
          label="Product Name"
          defaultValue={product?.name ?? ""}
          placeholder="Enter product name"
        />

        <TextField
          id="sku"
          name="sku"
          label="SKU"
          defaultValue={product?.sku ?? ""}
          placeholder="Enter SKU"
        />

        <SelectField
          id="category"
          name="category"
          label="Category"
          defaultValue={product?.category ?? ""}
          options={[
            { value: "", label: "Select category" },
            {
              value: "Oversized T-Shirt",
              label: "Oversized T-Shirt",
            },
            {
              value: "Classic T-Shirt",
              label: "Classic T-Shirt",
            },
            {
              value: "Hoodie",
              label: "Hoodie",
            },
          ]}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="price"
            name="price"
            label="Price"
            type="number"
            min={0}
            defaultValue={product?.price ?? ""}
            placeholder="0"
          />

          <TextField
            id="stock"
            name="stock"
            label="Stock"
            type="number"
            min={0}
            defaultValue={product?.stock ?? ""}
            placeholder="0"
          />
        </div>

        <SelectField
          id="status"
          name="status"
          defaultValue={product?.status ?? "draft"}
          label="Status"
          options={[
            { value: "active", label: "Live" },
            { value: "draft", label: "Hidden" },
            { value: "archived", label: "Archived" },
          ]}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <SubmitButton
          label={mode === "create" ? "Add Product" : "Save Changes"}
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