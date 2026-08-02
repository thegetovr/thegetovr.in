import SelectField from "@/components/admin/forms/SelectField";
import TextField from "@/components/admin/forms/TextField";
import { updateProduct } from "@/lib/productActions";
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
    mode === "edit" && product
      ? updateProduct.bind(null, product.id)
      : undefined;

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
          defaultValue={mode === "edit" ? product?.name : ""}
          placeholder="Enter product name"
        />

        <TextField
          id="sku"
          name="sku"
          label="SKU"
          defaultValue={mode === "edit" ? product?.sku : ""}
          placeholder="Enter SKU"
        />

        <SelectField
          id="category"
          name="category"
          label="Category"
          defaultValue={mode === "edit" ? product?.category : ""}
          options={[
            { value: "", label: "Select category" },
            { value: "Oversized T-Shirt", label: "Oversized T-Shirt" },
            { value: "Classic T-Shirt", label: "Classic T-Shirt" },
            { value: "Hoodie", label: "Hoodie" },
          ]}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="price"
            name="price"
            label="Price"
            type="number"
            min={0}
            defaultValue={mode === "edit" ? product?.price : ""}
            placeholder="0"
          />

          <TextField
            id="stock"
            name="stock"
            label="Stock"
            type="number"
            min={0}
            defaultValue={mode === "edit" ? product?.stock : ""}
            placeholder="0"
          />
        </div>

        <SelectField
          id="status"
          name="status"
          label="Status"
          defaultValue={mode === "edit" ? product?.status : "draft"}
          options={[
            { value: "active", label: "Live" },
            { value: "draft", label: "Hidden" },
            { value: "archived", label: "Archived" },
          ]}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          {mode === "create" ? "Add Product" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}