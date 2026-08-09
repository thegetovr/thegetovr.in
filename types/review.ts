export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  productId: string;

  customerName: string;

  rating: number;
  title: string;
  comment: string;

  status: ReviewStatus;

  createdAt: string;
  updatedAt: string;
}