import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { Address } from "@/models/Address";

// =====================================================
// GET — LOAD LOGGED-IN USER'S ADDRESSES
// =====================================================

export async function GET() {
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
    // LOAD ONLY THIS USER'S ADDRESSES
    // =====================================================

    const addresses = await Address.find({
      userId: user._id,
    })
      .sort({
        isDefault: -1,
        createdAt: -1,
      })
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

// =====================================================
// POST — ADD NEW ADDRESS
// =====================================================

export async function POST(request: Request) {
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
    // REQUEST DATA
    // =====================================================

    const body = await request.json();

    const { name, phone, address, city, state, pincode, country, isDefault } =
      body;

    // =====================================================
    // REQUIRED FIELD VALIDATION
    // =====================================================

    if (
      !name?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !pincode?.trim()
    ) {
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

    const cleanPhone = phone.trim();

    if (!/^\d{10}$/.test(cleanPhone)) {
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

    const cleanPincode = pincode.trim();

    if (!/^\d{6}$/.test(cleanPincode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Pincode must be 6 digits",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // DEFAULT ADDRESS HANDLING
    // =====================================================

    if (Boolean(isDefault)) {
      await Address.updateMany(
        {
          userId: user._id,
        },
        {
          $set: {
            isDefault: false,
          },
        },
      );
    }

    // =====================================================
    // CHECK EXISTING ADDRESSES
    // =====================================================

    const existingCount = await Address.countDocuments({
      userId: user._id,
    });

    // =====================================================
    // CREATE ADDRESS
    // =====================================================

    const newAddress = await Address.create({
      userId: user._id,

      name: name.trim(),
      phone: cleanPhone,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: cleanPincode,
      country: country?.trim() || "India",

      isDefault: existingCount === 0 ? true : Boolean(isDefault),
    });

    // =====================================================
    // SUCCESS
    // =====================================================

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
