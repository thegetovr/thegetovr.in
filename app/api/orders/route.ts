import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { createOrder, getOrders } from "@/lib/orderService";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { sendOrderPlacedEmail } from "@/lib/emails/orderPlaced";

async function getLoggedInUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;

  if (!token || !process.env.JWT_SECRET) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return null;
    }

    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("email");

    return user;
  } catch (error) {
    console.error("GET LOGGED IN USER ERROR:", error);
    return null;
  }
}

// =====================================================
// CREATE ORDER
// =====================================================

export async function POST(request: NextRequest) {
  try {
    // Get logged-in user
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        {
          status: 401,
        },
      );
    }

    // Get order data from frontend
    const order = await request.json();

    // Make sure customer object exists
    if (!order.customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer details are required.",
        },
        {
          status: 400,
        },
      );
    }

    // =================================================
    // IMPORTANT:
    // Email always comes from logged-in account.
    // Frontend email is NOT trusted.
    // =================================================

    const orderWithUserEmail = {
      ...order,

      customer: {
        ...order.customer,
        email: user.email,
      },
    };

    // =================================================
    // SAVE ORDER
    // =================================================

    const savedOrder = await createOrder(orderWithUserEmail);

    // =================================================
    // SEND ORDER PLACED EMAIL
    // =================================================

    try {
      await sendOrderPlacedEmail(savedOrder);
    } catch (emailError) {
      // Email failure should NOT make the order fail.
      console.error("ORDER PLACED EMAIL ERROR:", emailError);
    }

    // =================================================
    // SUCCESS
    // =================================================

    return NextResponse.json({
      success: true,
      message: "Order saved successfully.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Invalid order payload.",
      },
      {
        status: 400,
      },
    );
  }
}

// =====================================================
// GET ORDERS
// =====================================================

export async function GET(request: NextRequest) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        {
          status: 401,
        },
      );
    }

    const orders = await getOrders({
      email: user.email,
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Orders GET API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to fetch orders.",
      },
      {
        status: 500,
      },
    );
  }
}
