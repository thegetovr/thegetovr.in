import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        {
          status: 401,
        },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "string" || !decoded.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        {
          status: 401,
        },
      );
    }

    await connectDB();
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    console.log("Decoded JWT:", decoded);

    return NextResponse.json({
      success: true,
      message: "User is authenticated",
      user,
    });
  } catch (error) {
    console.error("SESSION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired session",
      },
      {
        status: 401,
      },
    );
  }
}
