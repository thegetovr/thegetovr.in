import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function getAuthenticatedUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is not configured.");
      return null;
    }

    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      !decoded.userId ||
      typeof decoded.userId !== "string"
    ) {
      return null;
    }

    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return null;
    }

    await connectToDatabase();

    const user = await User.findById(decoded.userId);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("AUTHENTICATION ERROR:", error);
    return null;
  }
}
