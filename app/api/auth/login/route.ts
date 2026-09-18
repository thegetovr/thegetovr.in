import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        {
          status: 400,
        },
      );
    }

    // Database Connect
    await connectToDatabase();

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        {
          status: 401,
        },
      );
    }

    // Compare Password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        {
          status: 401,
        },
      );
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    // Create response
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
      {
        status: 200,
      },
    );

    // Set authentication cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // --------------------------------------------------
    // LOGIN SUCCESS EMAIL
    // --------------------------------------------------

    try {
      const loginTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

      await resend.emails.send({
        from: "GetOvr <customer@thegetovr.in>",
        to: [user.email],
        subject: "New Login to Your GetOvr Account",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>Login Notification</title>
            </head>

            <body
              style="
                margin:0;
                padding:0;
                background:#f5f5f5;
                font-family:Arial, Helvetica, sans-serif;
              "
            >
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background:#f5f5f5; padding:24px 12px;"
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
                        border-radius:16px;
                        overflow:hidden;
                      "
                    >

                      <!-- Header -->
                      <tr>
                        <td
                          style="
                            background:#000000;
                            padding:28px 24px;
                            text-align:center;
                          "
                        >
                          <div
                            style="
                              color:#ffffff;
                              font-size:28px;
                              font-weight:800;
                              letter-spacing:-0.5px;
                            "
                          >
                            Get<span style="color:#ffffff;">Ovr</span>
                          </div>

                          <div
                            style="
                              color:#a3a3a3;
                              font-size:13px;
                              margin-top:6px;
                            "
                          >
                            Login Notification
                          </div>
                        </td>
                      </tr>

                      <!-- Content -->
                      <tr>
                        <td
                          style="
                            padding:32px 24px 28px;
                            color:#171717;
                          "
                        >

                          <h1
                            style="
                              margin:0 0 14px;
                              font-size:24px;
                              line-height:1.3;
                              color:#111111;
                            "
                          >
                            Welcome back, ${user.firstName}! 👋
                          </h1>

                          <p
                            style="
                              margin:0 0 24px;
                              font-size:15px;
                              line-height:1.7;
                              color:#555555;
                            "
                          >
                            Your GetOvr account was successfully logged in.
                            We're just letting you know for your security.
                          </p>

                          <!-- Login Details -->
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="
                              background:#f7f7f7;
                              border-radius:12px;
                              margin-bottom:24px;
                            "
                          >
                            <tr>
                              <td
                                style="
                                  padding:18px;
                                  font-size:14px;
                                  color:#555555;
                                "
                              >
                                <strong
                                  style="color:#111111;"
                                >
                                  Login Time
                                </strong>

                                <br />

                                <span
                                  style="
                                    display:block;
                                    margin-top:5px;
                                  "
                                >
                                  ${loginTime} IST
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td
                                style="
                                  padding:0 18px 18px;
                                  font-size:14px;
                                  color:#555555;
                                "
                              >
                                <strong
                                  style="color:#111111;"
                                >
                                  Account
                                </strong>

                                <br />

                                <span
                                  style="
                                    display:block;
                                    margin-top:5px;
                                    word-break:break-word;
                                  "
                                >
                                  ${user.email}
                                </span>
                              </td>
                            </tr>
                          </table>

                          <p
                            style="
                              margin:0 0 18px;
                              font-size:14px;
                              line-height:1.7;
                              color:#555555;
                            "
                          >
                            If this was you, no action is required.
                          </p>

                          <p
                            style="
                              margin:0;
                              padding:16px;
                              background:#fff7ed;
                              border-radius:10px;
                              font-size:13px;
                              line-height:1.6;
                              color:#9a3412;
                            "
                          >
                            <strong>Didn't log in?</strong><br />
                            If you don't recognize this activity, please
                            change your password immediately and secure
                            your GetOvr account.
                          </p>

                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td
                          style="
                            padding:22px 24px;
                            background:#fafafa;
                            text-align:center;
                            border-top:1px solid #eeeeee;
                          "
                        >
                          <p
                            style="
                              margin:0;
                              font-size:12px;
                              line-height:1.6;
                              color:#888888;
                            "
                          >
                            This is an automated security notification
                            from GetOvr.
                          </p>

                          <p
                            style="
                              margin:7px 0 0;
                              font-size:12px;
                              color:#aaaaaa;
                            "
                          >
                            © ${new Date().getFullYear()} GetOvr
                          </p>
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

    } catch (emailError) {
      // Email failure should NOT make login fail
      console.error("❌ LOGIN EMAIL ERROR:", emailError);
    }

    return response;
  } catch (error) {
    console.error("❌ LOGIN API ERROR", error);

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
