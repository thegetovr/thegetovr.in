interface ReviewSummaryProps {
  averageRating: number;
  reviewCount: number;
}

export default function ReviewSummary({
  averageRating,
  reviewCount,
}: ReviewSummaryProps) {
  if (reviewCount === 0) {
    return (
      <p className="text-sm text-(--color-text-muted)">
        No reviews yet
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className="flex items-center gap-0.5"
        aria-label={`${averageRating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={
              index < Math.round(averageRating)
                ? "text-(--color-accent)"
                : "text-(--color-border)"
            }
          >
            ★
          </span>
        ))}
      </div>

      <span className="font-medium text-(--color-text-primary)">
        {averageRating.toFixed(1)}
      </span>

      <span className="text-(--color-text-muted)">
        ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}