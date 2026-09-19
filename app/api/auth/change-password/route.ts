import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

import { sendEmail } from "@/lib/email/sendEmail";
import { PasswordChangedEmail } from "@/lib/email/templates/PasswordChangedEmail";

import { rateLimit, rateLimitResponse } from "@/lib/security/rateLimiter";

interface JWTPayload {
  userId?: string;
  email?: string;
}

export async function PUT(request: Request) {
  try {
    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in to change your password.",
        },
        { status: 401 },
      );
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is not configured.");

      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error.",
        },
        { status: 500 },
      );
    }

    let decoded: JWTPayload;

    try {
      decoded = jwt.verify(token, secret) as JWTPayload;
    } catch (error) {
      console.error("CHANGE PASSWORD JWT ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Your session has expired. Please log in again.",
        },
        { status: 401 },
      );
    }

    if (!decoded.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid authentication session.",
        },
        { status: 401 },
      );
    }

    // =====================================================
    // GET REQUEST DATA
    // =====================================================

    const body = await request.json();

    const { currentPassword, newPassword, confirmPassword } = body;

    // =====================================================
    // BASIC VALIDATION
    // =====================================================

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All password fields are required.",
        },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New passwords do not match.",
        },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be at least 8 characters long.",
        },
        { status: 400 },
      );
    }

    if (!/[A-Z]/.test(newPassword)) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must contain at least one uppercase letter.",
        },
        { status: 400 },
      );
    }

    if (!/\d/.test(newPassword)) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must contain at least one number.",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // DATABASE
    // =====================================================

    await connectToDatabase();

    // =====================================================
    // RATE LIMIT
    // =====================================================

    const limit = await rateLimit(request, "changePassword", decoded.userId);

    if (!limit.allowed) {
      return rateLimitResponse(limit.retryAfterSeconds);
    }

    // =====================================================
    // FIND USER
    // =====================================================

    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User account not found.",
        },
        { status: 404 },
      );
    }

    // =====================================================
    // VERIFY CURRENT PASSWORD
    // =====================================================

    const currentPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!currentPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect.",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // PREVENT SAME PASSWORD
    // =====================================================

    const samePassword = await bcrypt.compare(newPassword, user.password);

    if (samePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be different from your current password.",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // HASH NEW PASSWORD
    // =====================================================

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    // =====================================================
    // SEND PASSWORD CHANGE EMAIL
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
      console.error("❌ PASSWORD CHANGE EMAIL ERROR:", emailError);

      // Password has already changed.
      // Email failure should not undo the password change.
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message: "Password changed successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ CHANGE PASSWORD API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to change password. Please try again.",
      },
      { status: 500 },
    );
  }
}
