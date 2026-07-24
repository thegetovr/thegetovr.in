import { NextRequest, NextResponse } from "next/server";

const coupons = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
  },
  {
    code: "GETOVR500",
    type: "flat",
    value: 500,
  },
] as const;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { code, subtotal } = body;

  const coupon = coupons.find(
    (c) => c.code.toUpperCase() === String(code).toUpperCase()
  );

  if (!coupon) {
    return NextResponse.json(
      {
        valid: false,
        message: "Invalid coupon code",
      },
      { status: 404 }
    );
  }

  const discount =
    coupon.type === "flat"
      ? coupon.value
      : Math.round((subtotal * coupon.value) / 100);

  return NextResponse.json({
    valid: true,
    coupon,
    discount,
  });
}