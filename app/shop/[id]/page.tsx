import { notFound } from "next/navigation";

import ProductGallery from "@/components/shop/ProductGallery";
import ProductPurchasePanel from "@/components/shop/ProductPurchasePanel";
import ReviewsSection from "@/components/shop/ReviewsSection";
import ReviewForm from "@/components/shop/ReviewForm";

import { getProduct } from "@/lib/productService";
import {
  getProductReviews,
  getProductReviewSummary,
} from "@/lib/reviewService";

import Reveal from "@/components/animations/Reveal";

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

  const [reviewSummary, reviews] = await Promise.all([
    getProductReviewSummary(product.id),
    getProductReviews(product.id),
  ]);

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Product Main Section */}
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <ProductGallery media={product.media} productName={product.name} />
        </Reveal>

        <Reveal delay={0.1}>
          <ProductPurchasePanel
            product={product}
            reviewSummary={reviewSummary}
          />
        </Reveal>
      </div>

      {/* Reviews */}
      <Reveal delay={0.05}>
        <ReviewsSection reviews={reviews} />
      </Reveal>

      {/* Review Form */}
      <Reveal delay={0.1}>
        <ReviewForm productId={product.id} />
      </Reveal>
    </main>
  );
}
