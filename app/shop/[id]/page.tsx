import { notFound } from "next/navigation";

import ProductGallery from "@/components/shop/ProductGallery";
import { getProduct } from "@/lib/productService";
import ProductPurchasePanel from "@/components/shop/ProductPurchasePanel";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery media={product.media} productName={product.name} />

        <ProductPurchasePanel product={product} />
      </div>
    </main>
  );
}
