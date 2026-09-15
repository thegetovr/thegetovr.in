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

      const { error } = await resend.emails.send({
        from: "The GetOvr <customer@thegetovr.in>",
        to: user.email,
        subject: "Your The GetOvr Password Was Changed",

        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Password Changed</title>
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
            <td
              style="
                padding:32px 22px;
              "
            >

              <h1
                style="
                  margin:0;
                  font-size:24px;
                  line-height:1.3;
                  font-weight:600;
                "
              >
                Password Changed Successfully
              </h1>

              <p
                style="
                  margin:16px 0 0;
                  font-size:15px;
                  line-height:1.7;
                  color:#555;
                "
              >
                Hi ${user.firstName},
              </p>

              <p
                style="
                  margin:10px 0 0;
                  font-size:15px;
                  line-height:1.7;
                  color:#555;
                "
              >
                Your The GetOvr account password was
                successfully changed.
              </p>

              <!-- INFO BOX -->
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
                      Password changed on
                    </div>

                    <div
                      style="
                        font-size:15px;
                        font-weight:600;
                      "
                    >
                      ${changedAt} IST
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
                If you made this change, no further action
                is required.
              </p>

              <p
                style="
                  margin:12px 0 0;
                  font-size:14px;
                  line-height:1.7;
                  color:#555;
                "
              >
                If you did not change your password, please
                contact The GetOvr support team immediately
                and secure your account.
              </p>

              <div
                style="
                  margin-top:28px;
                  padding-top:20px;
                  border-top:1px solid #eee9e1;
                  font-size:13px;
                  line-height:1.7;
                  color:#777;
                "
              >
                For your security, never share your password
                or verification codes with anyone.
              </div>

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
                This is an automated security notification.
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
        console.error("❌ PASSWORD CHANGE EMAIL ERROR:", error);

        // Password has already changed.
        // Email failure should not undo the password change.
      }
    } catch (emailError) {
      console.error("❌ PASSWORD CHANGE EMAIL EXCEPTION:", emailError);
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
