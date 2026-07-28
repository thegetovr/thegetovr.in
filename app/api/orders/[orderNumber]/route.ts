import { NextResponse } from "next/server";
import { getOrderByNumber } from "@/lib/orderService";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ orderNumber: string }>;
  },
) {
  try {
    const { orderNumber } = await params;

    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        {
          status: 404,
        },
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
        message: "Unable to fetch order.",
      },
      {
        status: 500,
      },
    );
  }
}