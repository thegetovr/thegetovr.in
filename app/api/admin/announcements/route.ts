import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Announcement from "@/models/Announcement";

import { isAdminEmail } from "@/app/admin/adminAccess";

interface AuthTokenPayload {
  userId: string;
  email: string;
  role?: "user" | "admin";
  iat?: number;
  exp?: number;
}

/* -------------------------------------------------------------- */
/* ADMIN AUTHENTICATION                                           */
/* -------------------------------------------------------------- */

async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("❌ JWT_SECRET is not configured.");
    return null;
  }

  let decoded: AuthTokenPayload;

  try {
    decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;
  } catch (error) {
    console.error("❌ ANNOUNCEMENT JWT ERROR:", error);
    return null;
  }

  if (!decoded.userId) {
    return null;
  }

  await connectToDatabase();

  const user = await User.findById(decoded.userId).select("_id role email");

  if (!user) {
    return null;
  }

  const adminByRole = user.role === "admin";
  const adminByEmail = isAdminEmail(user.email);

  if (!adminByRole && !adminByEmail) {
    return null;
  }

  return user;
}

/* -------------------------------------------------------------- */
/* GET ALL ANNOUNCEMENTS                                          */
/* -------------------------------------------------------------- */

export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const announcements = await Announcement.find({})
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        announcements,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ ADMIN ANNOUNCEMENTS GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch announcements",
      },
      { status: 500 },
    );
  }
}

/* -------------------------------------------------------------- */
/* CREATE ANNOUNCEMENT                                            */
/* -------------------------------------------------------------- */

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const text = String(body?.text ?? "").trim();

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "Announcement text is required",
        },
        { status: 400 },
      );
    }

    if (text.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message: "Announcement cannot exceed 200 characters",
        },
        { status: 400 },
      );
    }

    const active = typeof body?.active === "boolean" ? body.active : true;

    const order = Number.isFinite(Number(body?.order)) ? Number(body.order) : 0;

    await connectToDatabase();

    const announcement = await Announcement.create({
      text,
      active,
      order,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Announcement created successfully",
        announcement,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ ANNOUNCEMENT CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create announcement",
      },
      { status: 500 },
    );
  }
}
