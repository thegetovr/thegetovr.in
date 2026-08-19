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

// =====================================================
// DELETE ADDRESS
// =====================================================

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid address ID",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const address = await Address.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message: "Address not found",
        },
        { status: 404 },
      );
    }

    // If deleted address was default,
    // make another address default.
    if (address.isDefault) {
      const nextAddress = await Address.findOne({
        userId,
      }).sort({ createdAt: -1 });

      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("❌ DELETE ADDRESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete address",
      },
      { status: 500 },
    );
  }
}

// =====================================================
// MAKE DEFAULT ADDRESS
// =====================================================

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid address ID",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    // Check that address belongs to logged-in user
    const address = await Address.findOne({
      _id: id,
      userId,
    });

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message: "Address not found",
        },
        { status: 404 },
      );
    }

    // Remove default from all user's addresses
    await Address.updateMany(
      { userId },
      {
        $set: {
          isDefault: false,
        },
      },
    );

    // Make selected address default
    address.isDefault = true;

    await address.save();

    return NextResponse.json({
      success: true,
      message: "Default address updated successfully",
      address,
    });
  } catch (error) {
    console.error("❌ MAKE DEFAULT ADDRESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update default address",
      },
      { status: 500 },
    );
  }
}

// =====================================================
// UPDATE ADDRESS
// =====================================================

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid address ID",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();
    const city = String(body.city ?? "").trim();
    const state = String(body.state ?? "").trim();
    const pincode = String(body.pincode ?? "").trim();
    const country = String(body.country ?? "India").trim();
    const isDefault = Boolean(body.isDefault);

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

    const existingAddress = await Address.findOne({
      _id: id,
      userId,
    });

    if (!existingAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Address not found",
        },
        { status: 404 },
      );
    }

    // If this address is becoming default,
    // remove default from all other addresses.
    if (isDefault) {
      await Address.updateMany(
        {
          userId,
          _id: { $ne: id },
        },
        {
          $set: {
            isDefault: false,
          },
        },
      );
    }

    existingAddress.name = name;
    existingAddress.phone = phone;
    existingAddress.address = address;
    existingAddress.city = city;
    existingAddress.state = state;
    existingAddress.pincode = pincode;
    existingAddress.country = country;
    existingAddress.isDefault = isDefault;

    await existingAddress.save();

    return NextResponse.json({
      success: true,
      message: "Address updated successfully",
      address: existingAddress,
    });
  } catch (error) {
    console.error("❌ UPDATE ADDRESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update address",
      },
      { status: 500 },
    );
  }
}
