import { NextRequest, NextResponse } from "next/server";
import { getOrderByNumberAndEmail } from "@/lib/orderService";

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, email } = await request.json();

    const order = await getOrderByNumberAndEmail(
      orderNumber,
      email
    );

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request.",
      },
      {
        status: 400,
      }
    );
  }
}