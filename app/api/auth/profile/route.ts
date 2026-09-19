import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import User from "@/models/User";

export async function PUT(request: Request) {
  try {
    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated.",
        },
        { status: 401 },
      );
    }

    // =====================================================
    // REQUEST DATA
    // =====================================================

    const body = await request.json();

    const { firstName, lastName, phone, dateOfBirth, gender } = body;

    // =====================================================
    // REQUIRED FIELD VALIDATION
    // =====================================================

    if (!firstName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required.",
        },
        { status: 400 },
      );
    }

    if (!lastName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Last name is required.",
        },
        { status: 400 },
      );
    }

    if (!phone?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required.",
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
          message: "Phone number must be 10 digits.",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // CHECK DUPLICATE PHONE
    // =====================================================

    if (cleanPhone !== user.phone) {
      const existingUser = await User.findOne({
        phone: cleanPhone,
        _id: { $ne: user._id },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            message: "This phone number is already registered.",
          },
          { status: 409 },
        );
      }
    }

    // =====================================================
    // UPDATE USER
    // =====================================================

    user.firstName = firstName.trim();
    user.lastName = lastName.trim();
    user.phone = cleanPhone;
    user.dateOfBirth = dateOfBirth?.trim() || "";
    user.gender = gender?.trim() || "";

    await user.save();

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to update profile.",
      },
      { status: 500 },
    );
  }
}
