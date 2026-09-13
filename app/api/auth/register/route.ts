import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import validator from "validator";

export async function POST(request: Request) {
  const body = await request.json();

  const { firstName, lastName, email, phone, password } = body;

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

  if (!validator.isEmail(email)) {
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

  if (phone.length !== 10) {
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

  await connectToDatabase();

  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
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
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
  });

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
}
