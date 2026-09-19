import { NextResponse } from "next/server";
import crypto from "crypto";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

import { sendEmail } from "@/lib/email/sendEmail";
import { ForgotPasswordEmail } from "@/lib/email/templates/ForgotPasswordEmail";

import { rateLimit, rateLimitResponse } from "@/lib/security/rateLimiter";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body?.email ?? "")
      .trim()
      .toLowerCase();

    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // DATABASE CONNECTION
    // =====================================================

    await connectToDatabase();

    // =====================================================
    // RATE LIMIT
    // =====================================================

    const limit = await rateLimit(request, "forgotPassword", email);

    if (!limit.allowed) {
      return rateLimitResponse(limit.retryAfterSeconds);
    }

    // =====================================================
    // FIND USER
    // =====================================================

    const user = await User.findOne({
      email,
    });

    // =====================================================
    // USER NOT FOUND
    // =====================================================

    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message:
            "If an account with this email exists, a reset link will be sent.",
        },
        {
          status: 200,
        },
      );
    }

    // =====================================================
    // GENERATE RESET TOKEN
    // =====================================================

    const resetToken = crypto.randomBytes(32).toString("hex");

    // Token valid for 15 minutes

    const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

    // =====================================================
    // SAVE RESET TOKEN
    // =====================================================

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;

    await user.save();

    // =====================================================
    // CREATE RESET URL
    // =====================================================

    const resetUrl =
      `${process.env.NEXT_PUBLIC_APP_URL}` +
      `/reset-password?token=${resetToken}`;

    // =====================================================
    // CREATE EMAIL TEMPLATE
    // =====================================================

    const emailHtml = ForgotPasswordEmail({
      firstName: user.firstName,
      resetUrl,
    });

    // =====================================================
    // SEND RESET EMAIL
    // =====================================================

    const emailResult = await sendEmail({
      type: "FORGOT_PASSWORD",
      to: user.email,
      subject: "Reset Your The GetOvr Password",
      html: emailHtml,
    });

    // =====================================================
    // EMAIL ERROR
    // =====================================================

    if (!emailResult.success) {
      console.error("❌ FORGOT PASSWORD EMAIL ERROR:", emailResult.error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send reset email.",
        },
        {
          status: 500,
        },
      );
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account with this email exists, a reset link has been sent.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("❌ FORGOT PASSWORD API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
