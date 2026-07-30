type CardSkeletonProps = {
  rows?: number;
};

export default function CardSkeleton({
  rows = 4,
}: CardSkeletonProps) {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 h-6 w-40 rounded bg-zinc-800" />

      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-zinc-800" />
              <div className="h-3 w-28 rounded bg-zinc-800" />
            </div>

            <div className="h-6 w-16 rounded-full bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}