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
          className={
            index < rating
              ? "text-(--color-accent)"
              : "text-(--color-border)"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection({
  reviews,
}: ReviewsSectionProps) {
  return (
    <section className="mt-20 border-t border-(--color-border) pt-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-(--color-text-muted)">
            Customer feedback
          </p>

          <h2 className="mt-3 font-(--font-editorial) text-4xl font-normal text-(--color-text-primary)">
            Customer Reviews
          </h2>
        </div>

        {reviews.length > 0 && (
          <p className="text-sm text-(--color-text-muted)">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="mt-8 border-y border-(--color-border) py-8">
          <p className="font-medium text-(--color-text-primary)">
            No reviews yet
          </p>

          <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
            Be the first to share your experience with this product.
          </p>
        </div>
      ) : (
        <div className="mt-8 divide-y divide-(--color-border) border-y border-(--color-border)">
          {reviews.map((review) => (
            <article key={review.id} className="py-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-3xl">
                  <StarRating rating={review.rating} />

                  <h3 className="mt-3 font-semibold text-(--color-text-primary)">
                    {review.title}
                  </h3>

                  <p className="mt-2 leading-7 text-(--color-text-secondary)">
                    {review.comment}
                  </p>
                </div>

                <div className="shrink-0 text-sm text-(--color-text-muted) sm:text-right">
                  <p className="font-medium text-(--color-text-primary)">
                    {review.customerName}
                  </p>

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