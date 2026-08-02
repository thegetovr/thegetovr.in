import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/products/ProductForm";
import { getProduct } from "@/lib/productService";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Edit Product
        </h1>

        <p className="mt-2 text-zinc-400">
          Update product information.
        </p>
      </div>

     <ProductForm
  mode="edit"
  product={product}
/>
    </div>
  );
}