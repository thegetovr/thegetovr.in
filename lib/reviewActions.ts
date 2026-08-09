"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/models/Review";

async function updateReviewStatus(
  reviewId: string,
  status: "approved" | "rejected",
) {
  if (!reviewId || !/^[0-9a-fA-F]{24}$/.test(reviewId)) {
    throw new Error("Invalid review ID.");
  }

  await connectToDatabase();

  const review = await Review.findByIdAndUpdate(
    reviewId,
    {
      status,
    },
    {
      new: true,
    },
  );

  if (!review) {
    throw new Error("Review not found.");
  }

  revalidatePath("/admin/reviews");
  revalidatePath(`/shop/${review.productId}`);
}

export async function approveReview(reviewId: string) {
  await updateReviewStatus(reviewId, "approved");
}

export async function rejectReview(reviewId: string) {
  await updateReviewStatus(reviewId, "rejected");
}