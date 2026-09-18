"use client";

import Link from "next/link";
import {
  ShoppingBag,
  User,
  Heart,
  Headphones,
  LogOut,
  MapPin,
} from "lucide-react";
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
        <div className="rounded-md border border-(--color-border) bg-(--color-surface) px-5 py-4 shadow-(--shadow-elevated)">
          <p className="text-sm text-(--color-text-muted)">
            Checking account...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // DROPDOWN
  // =====================================================

  return (
    <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 group-hover:block">
      <div className="w-80 overflow-hidden rounded-md border border-(--color-border) bg-(--color-surface) shadow-(--shadow-elevated)">
        {user ? (
          <div>
            {/* User Info */}

            <div className="px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-text-primary) text-white">
                  <User size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-(--color-text-primary)">
                    {user.firstName} {user.lastName}
                  </h3>

                  <p className="truncate text-xs text-(--color-text-muted)">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Logged In Menu */}

            <div className="border-t border-(--color-border) px-2 py-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
              >
                <User
                  size={18}
                  strokeWidth={1.8}
                  className="text-(--color-text-muted)"
                />
                My Profile
              </Link>

              <Link
                href="/profile?tab=orders"
                className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.8}
                  className="text-(--color-text-muted)"
                />
                My Orders
              </Link>

              <Link
                href="/profile?tab=wishlist"
                className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
              >
                <Heart
                  size={18}
                  strokeWidth={1.8}
                  className="text-(--color-text-muted)"
                />
                Wishlist
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
              >
                <Headphones
                  size={18}
                  strokeWidth={1.8}
                  className="text-(--color-text-muted)"
                />
                Contact Us
              </Link>
            </div>

            {/* Logout */}

            <div className="border-t border-(--color-border) px-2 py-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-(--color-error) transition-colors hover:bg-(--color-error-background)"
              >
                <LogOut
                  size={18}
                  strokeWidth={1.8}
                  className="text-(--color-text-muted)"
                />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Welcome */}

            <div className="px-5 py-5">
              <h3 className="text-lg font-semibold text-(--color-text-primary)">
                Welcome
              </h3>

              <p className="mt-1 text-sm leading-5 text-(--color-text-muted)">
                To access account and manage orders
              </p>

              <Link
                href="/login"
                className="mt-5 inline-flex items-center justify-center rounded-sm border border-(--color-accent) px-7 py-2.5 text-smfont-semibold text-(--color-accent) transition-colors hover:bg-(--color-accent) hover:text-white"
              >
                LOGIN / SIGNUP
              </Link>
            </div>

            {/* Logged Out Menu */}

            <div className="border-t border-(--color-border) px-2 py-2">
              <Link
                href="/login?redirect=/profile%3Ftab%3Dorders"
                className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.8}
                  className="text-(--color-text-muted)"
                />
                Orders
              </Link>

              <Link
                href="/track-order"
                className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
              >
                <MapPin
                  size={18}
                  strokeWidth={1.8}
                  className="text-(--color-text-muted)"
                />
                Track Order
              </Link>

              <Link
                href="/login?redirect=%2Fprofile%3Ftab%3Dwishlist"
                className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
              >
                <Heart
                  size={18}
                  strokeWidth={1.8}
                  className="text-(--color-text-muted)"
                />
                Wishlist
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
              >
                <Headphones
                  size={18}
                  strokeWidth={1.8}
                  className="text-(--color-text-muted)"
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