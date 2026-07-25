import { NextRequest, NextResponse } from "next/server";
import { saveOrder } from "@/lib/orders";
export async function POST(request: NextRequest) {
  try {
    const order = await request.json();

   await saveOrder(order);

    return NextResponse.json({
      success: true,
      message: "Order saved successfully.",
      order,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid order payload.",
      },
      {
        status: 400,
      },
    );
  }
}
