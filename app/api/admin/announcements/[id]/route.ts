import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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

/* =========================
   UPDATE ANNOUNCEMENT
========================= */

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    console.log("🔵 UPDATE ANNOUNCEMENT ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid announcement ID",
        },
        { status: 400 },
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

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      {
        $set: {
          text,
          active,
          order,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!announcement) {
      return NextResponse.json(
        {
          success: false,
          message: "Announcement not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Announcement updated successfully",
        announcement,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ ANNOUNCEMENT UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update announcement",
      },
      { status: 500 },
    );
  }
}

/* =========================
   DELETE ANNOUNCEMENT
========================= */

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    console.log("🔴 DELETE ANNOUNCEMENT ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid announcement ID",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return NextResponse.json(
        {
          success: false,
          message: "Announcement not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Announcement deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ ANNOUNCEMENT DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete announcement",
      },
      { status: 500 },
    );
  }
}
