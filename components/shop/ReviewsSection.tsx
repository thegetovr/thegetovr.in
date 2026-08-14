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
    <section className="mt-16 border-t border-(--color-border) pt-10">
      <h2 className="font-(--font-editorial) text-3xl font-normal text-(--color-text-primary)">
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="mt-6 rounded-(--radius-md) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-soft)">
          <p className="font-medium text-(--color-text-primary)">
            No reviews yet
          </p>

          <p className="mt-2 text-sm text-(--color-text-muted)">
            Be the first to share your experience with this product.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-(--radius-md) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-soft)"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <StarRating rating={review.rating} />

                  <h3 className="mt-3 font-semibold text-(--color-text-primary)">
                    {review.title}
                  </h3>

                  <p className="mt-2 leading-7 text-(--color-text-secondary)">
                    {review.comment}
                  </p>
                </div>

                <div className="shrink-0 text-sm text-(--color-text-muted)">
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