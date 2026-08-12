import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders } from "@/lib/orderService";

export async function POST(request: NextRequest) {
  try {
    const order = await request.json();

    const savedOrder = await createOrder(order);

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

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        {
          status: 400,
        },
      );
    }

    const orders = await getOrders({
      email,
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
