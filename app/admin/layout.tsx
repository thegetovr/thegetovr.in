import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

import { isAdminEmail } from "./adminAccess";

import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";

interface AdminLayoutProps {
  children: ReactNode;
}

interface AuthTokenPayload {
  userId: string;
  email: string;
  role?: "user" | "admin";
  iat?: number;
  exp?: number;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  /* -------------------------------------------------------------- */
  /* AUTHENTICATION                                                  */
  /* -------------------------------------------------------------- */

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // Not logged in
  if (!token) {
    redirect("/login");
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET is not configured.");
    redirect("/login");
  }

  let decoded: AuthTokenPayload;

  try {
    decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;
  } catch (error) {
    console.error("❌ ADMIN JWT ERROR:", error);

    // Invalid or expired token
    redirect("/login");
  }

  if (!decoded.userId) {
    redirect("/login");
  }

  /* -------------------------------------------------------------- */
  /* DATABASE USER VALIDATION                                        */
  /* -------------------------------------------------------------- */

  try {
    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("_id role email");

    // User does not exist anymore
    if (!user) {
      redirect("/login");
    }

    /* ------------------------------------------------------------ */
    /* ADMIN AUTHORIZATION                                          */
    /* ------------------------------------------------------------ */

    const adminByRole = user.role === "admin";
    const adminByEmail = isAdminEmail(user.email);

    // Must be admin by role OR approved admin email
    if (!adminByRole && !adminByEmail) {
      redirect("/");
    }
  } catch (error) {
    console.error("❌ ADMIN DATABASE AUTH ERROR:", error);

    redirect("/");
  }

  /* -------------------------------------------------------------- */
  /* ADMIN PANEL                                                     */
  /* -------------------------------------------------------------- */

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminTopbar />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
