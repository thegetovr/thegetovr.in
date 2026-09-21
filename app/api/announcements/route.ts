import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

export async function GET() {
  try {
    await connectToDatabase();

    const announcements = await Announcement.find({
      active: true,
    })
      .sort({
        order: 1,
        createdAt: 1,
      })
      .select("_id text order")
      .lean();

    return NextResponse.json(
      {
        success: true,
        announcements,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ PUBLIC ANNOUNCEMENTS GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch announcements",
        announcements: [],
      },
      { status: 500 },
    );
  }
}
