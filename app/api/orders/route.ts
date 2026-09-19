import { NextRequest, NextResponse } from "next/server";

import { createOrder, getOrders } from "@/lib/orderService";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

import { sendEmail } from "@/lib/email/sendEmail";
import { OrderPlacedEmail } from "@/lib/email/templates/OrderPlacedEmail";

/*
 * =========================
 * CREATE ORDER
 * =========================
 */

export async function POST(request: NextRequest) {
  try {
    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 },
      );
    }

    // =====================================================
    // REQUEST DATA
    // =====================================================

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

    // =====================================================
    // SERVER-OWNED USER DATA
    // =====================================================

    /*
     * NEVER trust userId or email coming from frontend.
     *
     * These values are always taken from the
     * authenticated account.
     */

    const orderWithUserOwnership = {
      ...order,

      userId: user._id.toString(),

      customer: {
        ...order.customer,
        email: user.email,
      },
    };

    // =====================================================
    // CREATE ORDER
    // =====================================================

    const savedOrder = await createOrder(orderWithUserOwnership);

    // =====================================================
    // ORDER EMAIL
    // =====================================================

    /*
     * Email failure should NOT make the order fail.
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

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json({
      success: true,
      message: "Order saved successfully.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("ORDER API ERROR:", error);

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

export async function GET(request: NextRequest) {
  try {
    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 },
      );
    }

    // =====================================================
    // FETCH ONLY AUTHENTICATED USER'S ORDERS
    // =====================================================

    const orders = await getOrders({
      userId: user._id.toString(),
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("ORDERS GET API ERROR:", error);

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
