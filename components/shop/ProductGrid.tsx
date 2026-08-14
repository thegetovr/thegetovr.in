import { getProductReviewSummaries } from "@/lib/reviewService";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default async function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-(--radius-md) border border-dashed border-(--color-border) py-20 text-center">
        <p className="text-sm text-(--color-text-muted)">
          No products found.
        </p>
      </div>
    );
  }

  const reviewSummaries = await getProductReviewSummaries(
    products.map((product) => product.id),
  );

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-12">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          reviewSummary={reviewSummaries[product.id]}
        />
      ))}
    </div>
  );
}