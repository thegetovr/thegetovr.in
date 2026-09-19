import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

import bcrypt from "bcryptjs";
import validator from "validator";

import { sendEmail } from "@/lib/email/sendEmail";
import { RegistrationWelcomeEmail } from "@/lib/email/templates/RegistrationWelcomeEmail";

import { rateLimit, rateLimitResponse } from "@/lib/security/rateLimiter";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, password, consentGiven } = body;

    // =====================================================
    // REQUIRED FIELDS
    // =====================================================

    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // CONSENT VALIDATION
    // =====================================================

    if (consentGiven !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "Please accept the terms and privacy policy",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    const normalizedEmail = String(email).trim().toLowerCase();

    if (!validator.isEmail(normalizedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // PHONE VALIDATION
    // =====================================================

    const normalizedPhone = String(phone).trim();

    if (normalizedPhone.length !== 10 || !/^\d{10}$/.test(normalizedPhone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number must be 10 digits",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // PASSWORD VALIDATION
    // =====================================================

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters",
        },
        {
          status: 400,
        },
      );
    }

    // =====================================================
    // DATABASE CONNECTION
    // =====================================================

    await connectToDatabase();

    // =====================================================
    // RATE LIMIT
    // =====================================================

    const limit = await rateLimit(request, "register");

    if (!limit.allowed) {
      return rateLimitResponse(limit.retryAfterSeconds);
    }

    // =====================================================
    // CHECK EXISTING USER
    // =====================================================

    const existingUser = await User.findOne({
      $or: [
        {
          email: normalizedEmail,
        },
        {
          phone: normalizedPhone,
        },
      ],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 409,
        },
      );
    }

    // =====================================================
    // HASH PASSWORD
    // =====================================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // =====================================================
    // CONSENT TIMESTAMP
    // =====================================================

    const consentAt = new Date();

    // =====================================================
    // CREATE USER
    // =====================================================

    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      password: hashedPassword,

      consentGiven: true,
      consentAt,
    });

    // =====================================================
    // SEND WELCOME EMAIL
    // =====================================================

    try {
      const emailHtml = RegistrationWelcomeEmail({
        firstName: newUser.firstName,
      });

      await sendEmail({
        type: "REGISTRATION_WELCOME",
        to: newUser.email,
        subject: "Welcome to The GetOvr",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("❌ REGISTRATION WELCOME EMAIL ERROR:", emailError);

      /*
       * Account has already been created.
       * Email failure should not undo registration.
       */
    }

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",

        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("REGISTER API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
