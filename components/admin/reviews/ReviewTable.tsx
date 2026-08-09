import Link from "next/link";

import { approveReview, rejectReview } from "@/lib/reviewActions";
import { Review } from "@/types/review";

interface ReviewTableProps {
  reviews: Review[];
  products: Record<string, string>;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span
      className="whitespace-nowrap text-yellow-400"
      aria-label={`${rating} out of 5 stars`}
    >
      {"★".repeat(rating)}
      <span className="text-zinc-600">
        {"★".repeat(5 - rating)}
      </span>
    </span>
  );
}

export default function ReviewTable({
  reviews,
  products,
}: ReviewTableProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center">
        <p className="font-medium text-white">No pending reviews</p>

        <p className="mt-2 text-sm text-zinc-500">
          New customer reviews will appear here for moderation.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 text-left text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-950">
            <tr>
              <th className="px-5 py-4 font-medium text-zinc-400">
                Customer
              </th>

              <th className="px-5 py-4 font-medium text-zinc-400">
                Product
              </th>

              <th className="px-5 py-4 font-medium text-zinc-400">
                Rating
              </th>

              <th className="px-5 py-4 font-medium text-zinc-400">
                Review
              </th>

              <th className="px-5 py-4 font-medium text-zinc-400">
                Date
              </th>

              <th className="px-5 py-4 text-right font-medium text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {reviews.map((review) => (
              <tr key={review.id} className="bg-black">
                <td className="px-5 py-5 align-top">
                  <p className="font-medium text-white">
                    {review.customerName}
                  </p>
                </td>

                <td className="px-5 py-5 align-top">
                  <Link
                    href={`/shop/${review.productId}`}
                    target="_blank"
                    className="text-zinc-300 transition hover:text-white"
                  >
                    {products[review.productId] ?? "Unknown product"}
                  </Link>
                </td>

                <td className="px-5 py-5 align-top">
                  <StarRating rating={review.rating} />
                </td>

                <td className="max-w-sm px-5 py-5 align-top">
                  <p className="font-medium text-white">
                    {review.title}
                  </p>

                  <p className="mt-2 line-clamp-3 text-zinc-500">
                    {review.comment}
                  </p>
                </td>

                <td className="whitespace-nowrap px-5 py-5 align-top text-zinc-500">
                  {new Date(review.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-5 py-5 align-top">
                  <div className="flex justify-end gap-2">
                    <form action={approveReview.bind(null, review.id)}>
                      <button
                        type="submit"
                        className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200"
                      >
                        Approve
                      </button>
                    </form>

                    <form action={rejectReview.bind(null, review.id)}>
                      <button
                        type="submit"
                        className="rounded-lg border border-red-900 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-950"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}