import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { Address } from "@/models/Address";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// =====================================================
// DELETE ADDRESS
// =====================================================

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // =====================================================
    // ADDRESS ID
    // =====================================================

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

    // =====================================================
    // DELETE ONLY USER'S OWN ADDRESS
    // =====================================================

    const address = await Address.findOneAndDelete({
      _id: id,
      userId: user._id,
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

    // =====================================================
    // RESTORE DEFAULT ADDRESS
    // =====================================================

    if (address.isDefault) {
      const nextAddress = await Address.findOne({
        userId: user._id,
      }).sort({
        createdAt: -1,
      });

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
    console.error("DELETE ADDRESS ERROR:", error);

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

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // =====================================================
    // ADDRESS ID
    // =====================================================

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

    // =====================================================
    // CHECK OWNERSHIP
    // =====================================================

    const address = await Address.findOne({
      _id: id,
      userId: user._id,
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

    // =====================================================
    // REMOVE DEFAULT FROM USER'S OTHER ADDRESSES
    // =====================================================

    await Address.updateMany(
      {
        userId: user._id,
        _id: { $ne: id },
      },
      {
        $set: {
          isDefault: false,
        },
      },
    );

    // =====================================================
    // MAKE SELECTED ADDRESS DEFAULT
    // =====================================================

    address.isDefault = true;

    await address.save();

    return NextResponse.json({
      success: true,
      message: "Default address updated successfully",
      address,
    });
  } catch (error) {
    console.error("MAKE DEFAULT ADDRESS ERROR:", error);

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

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // =====================================================
    // ADDRESS ID
    // =====================================================

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

    // =====================================================
    // REQUEST DATA
    // =====================================================

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();
    const city = String(body.city ?? "").trim();
    const state = String(body.state ?? "").trim();
    const pincode = String(body.pincode ?? "").trim();
    const country = String(body.country ?? "India").trim();
    const isDefault = Boolean(body.isDefault);

    // =====================================================
    // REQUIRED FIELD VALIDATION
    // =====================================================

    if (!name || !phone || !address || !city || !state || !pincode) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required address fields",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // PHONE VALIDATION
    // =====================================================

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number must be 10 digits",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // PINCODE VALIDATION
    // =====================================================

    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Pincode must be 6 digits",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // FIND ONLY USER'S OWN ADDRESS
    // =====================================================

    const existingAddress = await Address.findOne({
      _id: id,
      userId: user._id,
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

    // =====================================================
    // DEFAULT ADDRESS HANDLING
    // =====================================================

    if (isDefault) {
      await Address.updateMany(
        {
          userId: user._id,
          _id: { $ne: id },
        },
        {
          $set: {
            isDefault: false,
          },
        },
      );
    }

    // =====================================================
    // UPDATE ADDRESS
    // =====================================================

    existingAddress.name = name;
    existingAddress.phone = phone;
    existingAddress.address = address;
    existingAddress.city = city;
    existingAddress.state = state;
    existingAddress.pincode = pincode;
    existingAddress.country = country;
    existingAddress.isDefault = isDefault;

    await existingAddress.save();

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json({
      success: true,
      message: "Address updated successfully",
      address: existingAddress,
    });
  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);

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
