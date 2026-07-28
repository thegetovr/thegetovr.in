import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected!",
      database: "Connected",
    });
  } catch (error) {
    console.error("MongoDB Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Connection Failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}