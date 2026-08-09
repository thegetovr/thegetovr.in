import mongoose, { Schema } from "mongoose";
import { ReviewStatus } from "@/types/review";

const REVIEW_STATUSES: ReviewStatus[] = [
  "pending",
  "approved",
  "rejected",
];

const ReviewSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: REVIEW_STATUSES,
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Review =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;