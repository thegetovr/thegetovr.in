import { NextRequest, NextResponse } from "next/server";

const coupons = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrderValue: 1000,
  },

  {
    code: "GETOVR500",
    type: "flat",
    value: 500,
    minOrderValue: 3000,
  },
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const code = String(body?.code ?? "")
      .trim()
      .toUpperCase();

    const subtotal = Number(body?.subtotal);

    /*
     * Validate subtotal before using it.
     */
    if (!Number.isFinite(subtotal) || subtotal < 0) {
      return NextResponse.json(
        {
          valid: false,
          message: "Invalid subtotal.",
        },
        { status: 400 },
      );
    }

    if (subtotal <= 0) {
      return NextResponse.json(
        {
          valid: false,
          message: "Cart subtotal must be greater than zero.",
        },
        { status: 400 },
      );
    }

    if (!code) {
      return NextResponse.json(
        {
          valid: false,
          message: "Coupon code is required.",
        },
        { status: 400 },
      );
    }

    const coupon = coupons.find((item) => item.code === code);

    if (!coupon) {
      return NextResponse.json(
        {
          valid: false,
          message: "Invalid coupon code",
        },
        { status: 404 },
      );
    }

    /*
     * Minimum order value check.
     */
    if (subtotal < coupon.minOrderValue) {
      return NextResponse.json(
        {
          valid: false,
          message: `Minimum order value of ₹${coupon.minOrderValue} is required for this coupon.`,
        },
        { status: 400 },
      );
    }

    let discount = 0;

    if (coupon.type === "flat") {
      /*
       * Flat discount can never be greater than subtotal.
       */
      discount = Math.min(coupon.value, subtotal);
    } else {
      /*
       * Percentage discount.
       */
      discount = Math.round((subtotal * coupon.value) / 100);

      /*
       * Discount can never exceed subtotal.
       */
      discount = Math.min(discount, subtotal);
    }

    return NextResponse.json({
      valid: true,
      coupon,
      discount,
    });
  } catch (error) {
    console.error("COUPON VALIDATION ERROR:", error);

    return NextResponse.json(
      {
        valid: false,
        message: "Unable to validate coupon.",
      },
      { status: 400 },
    );
  }
}
