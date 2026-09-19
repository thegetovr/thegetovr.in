import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

import { sendEmail } from "@/lib/email/sendEmail";
import { LoginAlertEmail } from "@/lib/email/templates/LoginAlertEmail";

import {
  rateLimit,
  resetRateLimit,
  rateLimitResponse,
  checkSuccessfulLoginLimit,
  successfulLoginLimitResponse,
} from "@/lib/security/rateLimiter";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body?.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    /* -------------------------------------------------------------- */
    /* Failed Login Protection                                        */
    /* -------------------------------------------------------------- */

    const limit = await rateLimit(request, "login", email);

    if (!limit.allowed) {
      return rateLimitResponse(limit.retryAfterSeconds);
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        { status: 401 },
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        { status: 401 },
      );
    }

    /* -------------------------------------------------------------- */
    /* Successful Login Protection                                    */
    /*                                                              */
    /* 3 successful logins within 5 minutes are allowed.             */
    /* 4th login within that window → 15 minute block.               */
    /* -------------------------------------------------------------- */

    const successfulLoginLimit = await checkSuccessfulLoginLimit(
      request,
      email,
    );

    if (!successfulLoginLimit.allowed) {
      return successfulLoginLimitResponse(
        successfulLoginLimit.retryAfterSeconds,
      );
    }

    /* -------------------------------------------------------------- */
    /* Successful Login → Reset Failed Login Counter                  */
    /* -------------------------------------------------------------- */

    await resetRateLimit(request, "login", email);

    /* -------------------------------------------------------------- */
    /* JWT                                                            */
    /* -------------------------------------------------------------- */

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured.");

      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: "7d",
      },
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Login Successful",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
      { status: 200 },
    );

    /* -------------------------------------------------------------- */
    /* Auth Cookie                                                    */
    /* -------------------------------------------------------------- */

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    /* -------------------------------------------------------------- */
    /* Login Alert Email                                              */
    /* -------------------------------------------------------------- */

    try {
      const loginTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

      const emailHtml = LoginAlertEmail({
        firstName: user.firstName,
        email: user.email,
        loginTime: `${loginTime} IST`,
      });

      await sendEmail({
        type: "LOGIN_ALERT",
        to: user.email,
        subject: "New Login to Your The GetOvr Account",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("❌ LOGIN EMAIL ERROR:", emailError);
    }

    return response;
  } catch (error) {
    console.error("❌ LOGIN API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
