import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";

export async function POST(request: Request) {
  try {
    console.log("🚀 STEP 1 : Login API Hit");

    const body = await request.json();

    console.log("🚀 STEP 2 : Request Body");
    console.log(body);

    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        {
          status: 400,
        },
      );
    }

    // Database Connect
    await connectDB();
    console.log("🚀 STEP 3 : MongoDB Connected");

    // Find User
    const user = await User.findOne({ email });

    console.log("🚀 STEP 4 : User Search Complete");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        {
          status: 401,
        },
      );
    }

    console.log("🚀 STEP 5 : User Found");
    console.log(user);

    // Compare Password

    console.log("Stored Password:", user.password);
    console.log("Entered Password:", password);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isPasswordCorrect);

    console.log("🚀 STEP 6 : Password Compared");
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        {
          status: 401,
        },
      );
    }

    console.log("🚀 STEP 7 : Login Successful");

    return NextResponse.json(
      {
        success: true,
        message: "Login Successful",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("❌ LOGIN API ERROR");
    console.error(error);

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
