import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

interface JWTPayload {
  userId?: string;
  email?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

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
    // DELETE ACCOUNT
    // =====================================================

    const userEmail = user.email;
    const firstName = user.firstName;

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

      const { error } = await resend.emails.send({
        from: "The GetOvr <customer@thegetovr.in>",
        to: userEmail,
        subject: "Your The GetOvr Account Has Been Deleted",

        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Account Deleted</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f7f5f1;
    font-family:Arial,Helvetica,sans-serif;
    color:#181818;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background:#f7f5f1;padding:24px 12px;"
  >
    <tr>
      <td align="center">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:600px;
            background:#ffffff;
            border:1px solid #e8e3db;
          "
        >

          <!-- HEADER -->

          <tr>
            <td
              style="
                padding:28px 22px;
                text-align:center;
                border-bottom:1px solid #eee9e1;
              "
            >
              <div
                style="
                  font-size:25px;
                  font-weight:700;
                  letter-spacing:2px;
                "
              >
                THE GETOVR
              </div>

              <div
                style="
                  margin-top:7px;
                  font-size:12px;
                  color:#777;
                  letter-spacing:1px;
                "
              >
                ACCOUNT SECURITY
              </div>
            </td>
          </tr>

          <!-- CONTENT -->

          <tr>
            <td style="padding:32px 22px;">

              <h1
                style="
                  margin:0;
                  font-size:24px;
                  line-height:1.3;
                  font-weight:600;
                "
              >
                Account Deleted
              </h1>

              <p
                style="
                  margin:16px 0 0;
                  font-size:15px;
                  line-height:1.7;
                  color:#555;
                "
              >
                Hi ${firstName},
              </p>

              <p
                style="
                  margin:10px 0 0;
                  font-size:15px;
                  line-height:1.7;
                  color:#555;
                "
              >
                Your The GetOvr account has been successfully
                deleted as requested.
              </p>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  margin-top:24px;
                  background:#faf9f6;
                  border:1px solid #e8e3db;
                "
              >
                <tr>
                  <td style="padding:18px;">

                    <div
                      style="
                        font-size:13px;
                        color:#777;
                        margin-bottom:7px;
                      "
                    >
                      Account deleted on
                    </div>

                    <div
                      style="
                        font-size:15px;
                        font-weight:600;
                      "
                    >
                      ${deletedAt} IST
                    </div>

                  </td>
                </tr>
              </table>

              <p
                style="
                  margin:24px 0 0;
                  font-size:14px;
                  line-height:1.7;
                  color:#555;
                "
              >
                If you did not request this deletion, please
                contact The GetOvr support team immediately.
              </p>

              <p
                style="
                  margin:14px 0 0;
                  font-size:14px;
                  line-height:1.7;
                  color:#555;
                "
              >
                Thank you for being a part of The GetOvr.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->

          <tr>
            <td
              style="
                padding:20px 22px;
                background:#181818;
                text-align:center;
              "
            >
              <div
                style="
                  font-size:12px;
                  color:#ffffff;
                  letter-spacing:.5px;
                "
              >
                © ${new Date().getFullYear()} The GetOvr
              </div>

              <div
                style="
                  margin-top:6px;
                  font-size:11px;
                  color:#aaa;
                "
              >
                This is an automated account security notification.
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
        `,
      });

      if (error) {
        console.error("❌ DELETE ACCOUNT EMAIL ERROR:", error);
      }
    } catch (emailError) {
      console.error("❌ DELETE ACCOUNT EMAIL EXCEPTION:", emailError);
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
