"use client";

import Link from "next/link";
import { ShoppingBag, User, Heart, Headphones } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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

  // =====================================================
  // SESSION
  // =====================================================

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

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        setUser(null);

        const message = result.message || "Logout Successful";

        // Show immediately
        window.dispatchEvent(
          new CustomEvent("auth-notification", {
            detail: {
              message,
              type: "success",
            },
          }),
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

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingUser) {
    return (
      <div className="absolute left-1/2 top-full z-50 hidden w-72 -translate-x-1/2 group-hover:block">
        <div className="rounded-xl border border-[#ddd5ca] bg-white px-5 py-4 shadow-2xl">
          <p className="text-sm text-zinc-500">Checking account...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // DROPDOWN
  // =====================================================

  return (
    <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 group-hover:block">
      <div className="w-80 overflow-hidden rounded-xl border border-[#ddd5ca] bg-white shadow-2xl">
        {user ? (
          /* =========================
             LOGGED IN
          ========================== */

          <div>
            {/* User Info */}

            <div className="px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eee3d5] text-zinc-900">
                  <User size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-black">
                    {user.firstName} {user.lastName}
                  </h3>

                  <p className="truncate text-xs text-zinc-500">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Logged In Menu */}

            <div className="border-t border-[#eee8df] px-2 py-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-600 transition hover:bg-[#fcfaf7] hover:text-black"
              >
                <User size={18} strokeWidth={1.8} className="text-zinc-500" />
                My Profile
              </Link>

              <Link
                href="/profile?tab=orders"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm
                 text-zinc-600 transition hover:bg-[#fcfaf7] hover:text-black"
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.8}
                  className="text-zinc-500"
                />
                My Orders
              </Link>

              <Link
                href="/profile?tab=wishlist"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-600 transition hover:bg-[#fcfaf7] hover:text-black"
              >
                <Heart size={18} strokeWidth={1.8} className="text-zinc-500" />
                Wishlist
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-600 transition hover:bg-[#fcfaf7] hover:text-black"
              >
                <Headphones
                  size={18}
                  strokeWidth={1.8}
                  className="text-zinc-500"
                />
                Contact Us
              </Link>
            </div>

            {/* Logout */}

            <div className="border-t border-[#eee8df] px-2 py-2">
              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-red-600
                  transition
                  hover:bg-red-50
                  hover:text-red-700
                "
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
              <h3 className="text-lg font-semibold text-black">Welcome</h3>

              <p className="mt-1 text-sm leading-5 text-zinc-500">
                To access account and manage orders
              </p>

              <Link
                href="/login"
                className="
                  mt-5
                  inline-flex
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-[#cdbb9f]
                  bg-[#eee3d5]
                  px-7
                  py-2.5
                  text-sm
                  font-semibold
                  text-zinc-900
                  transition-all
                  duration-300
                  hover:bg-[#e6d8c6]
                  hover:text-black
                "
              >
                LOGIN / SIGNUP
              </Link>
            </div>

            {/* Logged Out Menu */}

            <div className="border-t border-[#eee8df] px-2 py-2">
              <Link
                href="/login?redirect=/profile%3Ftab%3Dorders"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-600 transition hover:bg-[#fcfaf7] hover:text-black"
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.8}
                  className="text-zinc-500"
                />
                Orders
              </Link>

              <Link
                href="/login?redirect=%2Fprofile%3Ftab%3Dwishlist"
                className="flex items-center gap-3  rounded-lg px-3 py-2.5 text-sm text-zinc-600 transition
                 hover:bg-[#fcfaf7] hover:text-black"
              >
                <Heart size={18} strokeWidth={1.8} className="text-zinc-500" />
                Wishlist
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3  rounded-lg px-3 py-2.5 text-sm text-zinc-600 transition hover:bg-[#fcfaf7]
                 hover:text-black"
              >
                <Headphones
                  size={18}
                  strokeWidth={1.8}
                  className="text-zinc-500"
                />
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
