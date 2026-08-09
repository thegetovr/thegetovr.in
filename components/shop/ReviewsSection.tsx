import { Review } from "@/types/review";

interface ReviewsSectionProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < rating ? "text-yellow-400" : "text-zinc-600"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="mt-16 border-t border-zinc-800 pt-10">
      <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="font-medium text-white">No reviews yet</p>

          <p className="mt-2 text-sm text-zinc-500">
            Be the first to share your experience with this product.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <StarRating rating={review.rating} />

                  <h3 className="mt-3 font-semibold text-white">
                    {review.title}
                  </h3>

                  <p className="mt-2 leading-7 text-zinc-400">
                    {review.comment}
                  </p>
                </div>

                <div className="shrink-0 text-sm text-zinc-500">
                  <p>{review.customerName}</p>

                  <p className="mt-1">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}