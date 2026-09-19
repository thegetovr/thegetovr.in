import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

import { sendEmail } from "@/lib/email/sendEmail";
import { AccountDeletedEmail } from "@/lib/email/templates/AccountDeletedEmail";

interface JWTPayload {
  userId?: string;
  email?: string;
}

export async function DELETE() {
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
          message: "You must be logged in.",
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
      console.error("DELETE ACCOUNT JWT ERROR:", error);

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
    // DATABASE
    // =====================================================

    await connectToDatabase();

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
    // SAVE USER DETAILS FOR EMAIL
    // =====================================================

    const userEmail = user.email;
    const firstName = user.firstName;

    // =====================================================
    // DELETE ACCOUNT
    // =====================================================

    await User.findByIdAndDelete(decoded.userId);

    // =====================================================
    // SEND ACCOUNT DELETION EMAIL
    // =====================================================

    try {
      const deletedAt = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

      const emailHtml = AccountDeletedEmail({
        firstName,
        deletedAt: `${deletedAt} IST`,
      });

      await sendEmail({
        type: "ACCOUNT_DELETED",
        to: userEmail,
        subject: "Your The GetOvr Account Has Been Deleted",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("❌ DELETE ACCOUNT EMAIL ERROR:", emailError);

      // Account has already been deleted.
      // Email failure should not undo account deletion.
    }

    // =====================================================
    // CLEAR AUTH COOKIE
    // =====================================================

    const response = NextResponse.json(
      {
        success: true,
        message: "Your account has been deleted successfully.",
      },
      { status: 200 },
    );

    response.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("❌ DELETE ACCOUNT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete your account. Please try again.",
      },
      { status: 500 },
    );
  }
}
