import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { createOrder, getOrders } from "@/lib/orderService";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

import { sendEmail } from "@/lib/email/sendEmail";
import { OrderPlacedEmail } from "@/lib/email/templates/OrderPlacedEmail";

type AuthenticatedUser = {
  userId: string;
  email: string;
};

async function getLoggedInUser(): Promise<AuthenticatedUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token || !process.env.JWT_SECRET) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId?: string;
      email?: string;
    };

    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return null;
    }

    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("_id email");

    if (!user) {
      return null;
    }

    return {
      userId: user._id.toString(),
      email: user.email,
    };
  } catch (error) {
    console.error("GET LOGGED IN USER ERROR:", error);
    return null;
  }
}

/*
 * =========================
 * CREATE ORDER
 * =========================
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 },
      );
    }

    const order = await request.json();

    if (!order || !order.customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer details are required.",
        },
        { status: 400 },
      );
    }

    /*
     * 🔐 IMPORTANT SECURITY RULE
     *
     * Never trust userId/email coming from frontend.
     * We overwrite both values using the authenticated
     * account from auth_token.
     */
    const orderWithUserOwnership = {
      ...order,

      userId: user.userId,

      customer: {
        ...order.customer,

        email: user.email,
      },
    };

    const savedOrder = await createOrder(orderWithUserOwnership);

    /*
     * =====================================================
     * ORDER PLACED EMAIL
     * =====================================================
     *
     * Email failure should NOT make the order fail.
     *
     * The email template and ON/OFF control are now
     * handled by the centralized email system.
     */
    try {
      const emailHtml = OrderPlacedEmail({
        order: savedOrder,
      });

      await sendEmail({
        type: "ORDER_PLACED",
        to: savedOrder.customer.email,
        subject: `Order #${savedOrder.orderNumber} Confirmed | The GetOvr`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("ORDER PLACED EMAIL ERROR:", emailError);
    }

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
      { status: 400 },
    );
  }
}

/*
 * =========================
 * GET MY ORDERS
 * =========================
 */
export async function GET() {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 },
      );
    }

    /*
     * 🔐 Fetch ONLY orders belonging to the
     * authenticated user's userId.
     *
     * We intentionally DO NOT use email here.
     */
    const orders = await getOrders({
      userId: user.userId,
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
      { status: 500 },
    );
  }
}
