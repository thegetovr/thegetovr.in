import ReviewTable from "@/components/admin/reviews/ReviewTable";
import { getProductsByIds } from "@/lib/productService";
import { getPendingReviews } from "@/lib/reviewService";

export default async function AdminReviewsPage() {
  const reviews = await getPendingReviews();

  const productIds = [...new Set(reviews.map((review) => review.productId))];

  const products = await getProductsByIds(productIds);

  const productMap = Object.fromEntries(
    products.map((product) => [product.id, product.name]),
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Reviews</h1>

        <p className="mt-2 text-zinc-400">
          Review and moderate customer feedback before it appears publicly.
        </p>
      </div>

      <ReviewTable reviews={reviews} products={productMap} />
    </div>
  );
}