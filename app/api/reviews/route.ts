import { NextRequest, NextResponse } from "next/server";

import { createReview } from "@/lib/reviewService";

export async function POST(request: NextRequest) {
  try {
    const review = await request.json();

    const savedReview = await createReview(review);

    return NextResponse.json(
      {
        success: true,
        message:
          "Review submitted successfully and is pending approval.",
        review: savedReview,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Review API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Invalid review payload.",
      },
      {
        status: 400,
      },
    );
  }
}