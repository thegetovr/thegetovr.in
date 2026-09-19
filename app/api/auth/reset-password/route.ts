import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

import { sendEmail } from "@/lib/email/sendEmail";
import { PasswordChangedEmail } from "@/lib/email/templates/PasswordChangedEmail";

import { rateLimit, rateLimitResponse } from "@/lib/security/rateLimiter";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { token, password } = body;

    // =====================================================
    // TOKEN + PASSWORD VALIDATION
    // =====================================================

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // PASSWORD LENGTH
    // =====================================================

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
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

    const limit = await rateLimit(request, "resetPassword");

    if (!limit.allowed) {
      return rateLimitResponse(limit.retryAfterSeconds);
    }

    // =====================================================
    // FIND USER BY RESET TOKEN
    // =====================================================

    const user = await User.findOne({
      resetPasswordToken: token,
    });

    // =====================================================
    // INVALID TOKEN
    // =====================================================

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // CHECK TOKEN EXPIRY
    // =====================================================

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // PASSWORD HASHING
    // =====================================================

    const hashedPassword = await bcrypt.hash(password, 12);

    // =====================================================
    // UPDATE PASSWORD
    // =====================================================

    user.password = hashedPassword;

    // =====================================================
    // REMOVE RESET TOKEN
    // =====================================================

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // =====================================================
    // SEND PASSWORD CHANGED EMAIL
    // =====================================================

    try {
      const changedAt = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

      const emailHtml = PasswordChangedEmail({
        firstName: user.firstName,
        changedAt: `${changedAt} IST`,
      });

      await sendEmail({
        type: "PASSWORD_CHANGED",
        to: user.email,
        subject: "Your The GetOvr Password Was Changed",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("❌ RESET PASSWORD EMAIL ERROR:", emailError);

      // Password has already been reset.
      // Email failure should not undo the password reset.
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("❌ RESET PASSWORD API ERROR:", error);

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
