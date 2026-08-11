import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/models/Review";
import { Review as ReviewType, ReviewStatus } from "@/types/review";

type ReviewDocument = {
  _id: {
    toString(): string;
  };
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  status: ReviewStatus;
  createdAt: Date;
  updatedAt: Date;
};
export interface CreateReviewInput {
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
}

function formatReview(review: ReviewDocument): ReviewType {
  return {
    id: review._id.toString(),
    productId: review.productId,
    customerName: review.customerName,
    rating: review.rating,
    title: review.title,
    comment: review.comment,
    status: review.status,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  };
}

export async function getProductReviews(
  productId: string,
): Promise<ReviewType[]> {
  await connectToDatabase();

  const reviews = await Review.find({
    productId,
    status: "approved",
  })
    .sort({ createdAt: -1 })
    .lean<ReviewDocument[]>();

  return reviews.map(formatReview);
}

export async function getProductReviewSummary(productId: string) {
  await connectToDatabase();

  const result = await Review.aggregate([
    {
      $match: {
        productId,
        status: "approved",
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        reviewCount: {
          $sum: 1,
        },
      },
    },
  ]);

  if (result.length === 0) {
    return {
      averageRating: 0,
      reviewCount: 0,
    };
  }

  return {
    averageRating: Number(result[0].averageRating.toFixed(1)),
    reviewCount: result[0].reviewCount,
  };
}
export async function createReview(
  input: CreateReviewInput,
): Promise<ReviewType> {
  const productId = input.productId.trim();
  const customerName = input.customerName.trim();
  const title = input.title.trim();
  const comment = input.comment.trim();

  if (!productId) {
    throw new Error("Product ID is required.");
  }

  if (!customerName) {
    throw new Error("Your name is required.");
  }

  if (
    !Number.isInteger(input.rating) ||
    input.rating < 1 ||
    input.rating > 5
  ) {
    throw new Error("Rating must be between 1 and 5.");
  }

  if (!title) {
    throw new Error("Review title is required.");
  }

  if (title.length > 120) {
    throw new Error("Review title cannot exceed 120 characters.");
  }

  if (!comment) {
    throw new Error("Review comment is required.");
  }

  if (comment.length > 1000) {
    throw new Error("Review comment cannot exceed 1000 characters.");
  }

  await connectToDatabase();

  const review = await Review.create({
    productId,
    customerName,
    rating: input.rating,
    title,
    comment,
    status: "pending",
  });

  return formatReview(review.toObject() as ReviewDocument);
}
export async function getPendingReviews(): Promise<ReviewType[]> {
  await connectToDatabase();

  const reviews = await Review.find({
    status: "pending",
  })
    .sort({ createdAt: -1 })
    .lean<ReviewDocument[]>();

  return reviews.map(formatReview);
}
export async function getProductReviewSummaries(productIds: string[]) {
  if (productIds.length === 0) {
    return {};
  }

  await connectToDatabase();

  const result = await Review.aggregate([
    {
      $match: {
        productId: { $in: productIds },
        status: "approved",
      },
    },
    {
      $group: {
        _id: "$productId",
        averageRating: {
          $avg: "$rating",
        },
        reviewCount: {
          $sum: 1,
        },
      },
    },
  ]);

  return result.reduce<
    Record<string, { averageRating: number; reviewCount: number }>
  >((summaries, item) => {
    summaries[item._id] = {
      averageRating: Number(item.averageRating.toFixed(1)),
      reviewCount: item.reviewCount,
    };

    return summaries;
  }, {});
}