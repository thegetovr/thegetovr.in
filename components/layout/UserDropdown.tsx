"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserDropdownProps {
  onNotification: (message: string, type: "success" | "error") => void;
}

export default function UserDropdown({ onNotification }: UserDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const result = await response.json();

        if (result.success) {
          setUser(result.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session Check Error:", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    checkSession();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        setUser(null);

        sessionStorage.setItem(
          "auth_notification",
          result.message || "Logout Successful",
        );

        router.push("/");
      } else {
        onNotification(result.message, "error");
      }
    } catch (error) {
      console.error("Logout Error:", error);

      onNotification("Something went wrong", "error");
    }
  };

  if (loadingUser) {
    return (
      <div className="absolute left-1/2 top-full z-50 hidden w-72 -translate-x-1/2 group-hover:block">
        <div className="rounded-xl border border-white/20 bg-black px-5 py-4 shadow-2xl">
          <p className="text-sm text-gray-400">Checking account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 group-hover:block">
      <div className="w-80 overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl">
        {user ? (
          /* =========================
             LOGGED IN
          ========================== */
          <div>
            {/* User Info */}
            <div className="px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                  <User size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </h3>

                  <p className="truncate text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Logged In Menu */}
            <div className="border-t border-white/10 px-2 py-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                <User size={18} strokeWidth={1.8} />
                My Profile
              </Link>

              <Link
                href="/profile?tab=orders"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                <ShoppingBag size={18} strokeWidth={1.8} />
                My Orders
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                <span className="text-lg">♡</span>
                Wishlist
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                <span className="text-lg">•</span>
                Contact Us
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-white/10 px-2 py-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                <span className="text-lg">↪</span>
                Logout
              </button>
            </div>
          </div>
        ) : (
          /* =========================
             LOGGED OUT
          ========================== */
          <div>
            {/* Welcome */}
            <div className="px-5 py-5">
              <h3 className="text-lg font-semibold text-white">Welcome</h3>

              <p className="mt-1 text-sm leading-5 text-gray-400">
                To access account and manage orders
              </p>

              <Link
                href="/login"
                className="mt-5 inline-flex items-center justify-center rounded-md border border-[#F4B400] px-7 py-2.5 text-sm font-semibold text-[#F4B400] transition-all duration-300 hover:bg-[#F4B400] hover:text-black"
              >
                LOGIN / SIGNUP
              </Link>
            </div>

            {/* Logged Out Menu */}
            <div className="border-t border-white/10 px-2 py-2">
              <Link
                href="/orders"
                className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Orders
              </Link>

              <Link
                href="/wishlist"
                className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Wishlist
              </Link>

              <Link
                href="/contact"
                className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
