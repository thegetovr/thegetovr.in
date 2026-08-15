import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { connectToDatabase } from "@/lib/mongodb";
import { Address } from "@/models/Address";

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token || !process.env.JWT_SECRET) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return null;
    }

    return decoded.userId;
  } catch {
    return null;
  }
}

// GET — Load logged-in user's addresses
export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const addresses = await Address.find({ userId })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error("GET ADDRESSES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load addresses",
      },
      { status: 500 },
    );
  }
}

// POST — Add new address
export async function POST(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const { name, phone, address, city, state, pincode, country, isDefault } =
      body;

    if (!name || !phone || !address || !city || !state || !pincode) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required address fields",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    // If this address is default,
    // remove default from user's existing addresses.
    if (isDefault) {
      await Address.updateMany({ userId }, { $set: { isDefault: false } });
    }

    // If user has no addresses,
    // automatically make first address default.
    const existingCount = await Address.countDocuments({ userId });

    const newAddress = await Address.create({
      userId,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      country: country?.trim() || "India",
      isDefault: existingCount === 0 ? true : Boolean(isDefault),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Address saved successfully",
        address: newAddress,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE ADDRESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save address",
      },
      { status: 500 },
    );
  }
}
