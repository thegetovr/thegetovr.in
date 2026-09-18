import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { getOrderByNumber } from "@/lib/orderService";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

async function getLoggedInUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token || !process.env.JWT_SECRET) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId?: string;
    };

    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return null;
    }

    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("_id");

    if (!user) {
      return null;
    }

    return user._id.toString();
  } catch (error) {
    console.error("ORDER AUTH ERROR:", error);
    return null;
  }
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ orderNumber: string }>;
  },
) {
  try {
    const userId = await getLoggedInUserId();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 },
      );
    }

    const { orderNumber } = await params;

    if (!orderNumber?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Order number is required.",
        },
        { status: 400 },
      );
    }

    /*
     * 🔐 IMPORTANT
     *
     * Order is searched by BOTH:
     *
     * 1. orderNumber
     * 2. logged-in user's userId
     *
     * So knowing someone else's order number
     * is not enough to access their order.
     */
    const order = await getOrderByNumber(orderNumber, userId);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("ORDER DETAIL API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch order.",
      },
      { status: 500 },
    );
  }
}
