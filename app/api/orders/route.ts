import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/orderService";

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
        message: "Invalid order payload.",
      },
      {
        status: 400,
      }
    );
  }
}