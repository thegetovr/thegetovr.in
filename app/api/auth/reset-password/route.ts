import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

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
    console.error("❌ RESET PASSWORD API ERROR", error);

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
