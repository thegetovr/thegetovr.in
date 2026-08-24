import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email } = body;

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
    // FIND USER
    // =====================================================

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
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

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    console.log("Reset URL:", resetUrl);

    // =====================================================
    // SEND RESET EMAIL
    // =====================================================

    const { error } = await resend.emails.send({
      from: "The GetOvr <customer@thegetovr.in>",
      to: user.email,
      subject: "Reset Your The GetOvr Password",

      html: `
        <div
          style="
            margin: 0;
            padding: 40px 20px;
            background-color: #fcfbf9;
            font-family: Arial, sans-serif;
            color: #181715;
          "
        >
          <div
            style="
              max-width: 600px;
              margin: 0 auto;
              padding: 40px;
              background-color: #ffffff;
              border: 1px solid #ddd5ca;
              border-radius: 20px;
            "
          >
            <h2
              style="
                margin: 0 0 20px;
                color: #a67c35;
              "
            >
              Reset Your Password
            </h2>

            <p>
              Hello ${user.firstName},
            </p>

            <p>
              We received a request to reset the password
              for your The GetOvr account.
            </p>

            <p>
              Click the button below to create a new password:
            </p>

            <div style="margin: 30px 0;">
              <a
                href="${resetUrl}"
                style="
                  display: inline-block;
                  padding: 14px 24px;
                  background-color: #eee3d5;
                  color: #181715;
                  text-decoration: none;
                  border-radius: 10px;
                  font-weight: 600;
                "
              >
                RESET PASSWORD
              </a>
            </div>

            <p>
              This password reset link will expire in
              <strong>15 minutes</strong>.
            </p>

            <p>
              If you did not request a password reset,
              you can safely ignore this email.
            </p>

            <p style="margin-top: 30px;">
              Regards,<br />
              <strong>The GetOvr Team</strong>
            </p>
          </div>
        </div>
      `,
    });

    // =====================================================
    // RESEND ERROR
    // =====================================================

    if (error) {
      console.error("❌ RESEND ERROR:", error);

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
    console.error("❌ FORGOT PASSWORD API ERROR", error);

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
