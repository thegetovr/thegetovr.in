"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import UserDropdown from "@/components/layout/UserDropdown";

import Logo from "@/components/ui/Logo";
import { useCartStore } from "@/stores/cartStore";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
const readyMadeItems = useCartStore((state) => state.readyMadeItems);
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );

  useEffect(() => {
    const authNotification = sessionStorage.getItem("auth_notification");

    if (authNotification) {
      setNotificationType("success");
      setNotification(authNotification);

      sessionStorage.removeItem("auth_notification");

      const timeout = window.setTimeout(() => {
        setNotification("");
      }, 2000);

      return () => window.clearTimeout(timeout);
    }
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const totalQuantity =
  items.reduce((total, item) => total + item.quantity, 0) +
  readyMadeItems.reduce((total, item) => total + item.quantity, 0);
  console.log("Navbar cart items:", items);
console.log("Navbar total quantity:", totalQuantity);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
          <Link href="/shop" className="transition-colors hover:text-white">
            Shop
          </Link>

          <Link href="/studio" className="transition-colors hover:text-white">
            Studio
          </Link>

          <Link href="/about" className="transition-colors hover:text-white">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search products..."
              className="w-90 rounded-full border border-white/30 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-400 outline-none focus:border-white/60"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* User */}
          <div className="group relative flex h-20 items-center">
            <button className="flex h-full items-center justify-center px-2 text-gray-300 transition hover:text-white">
              <User size={24} strokeWidth={1.8} />
            </button>

            <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-white transition-all duration-300 ease-out group-hover:w-full" />

            <UserDropdown
              onNotification={(message, type) => {
                setNotification(message);
                setNotificationType(type);

                window.setTimeout(() => {
                  setNotification("");
                }, 2000);
              }}
            />
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition hover:border-white/20 hover:bg-white/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h2l2.4 10.2a2 2 0 001.98 1.55h8.94a2 2 0 001.98-1.55L21 7H7"
              />
              <circle cx="10" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>

            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
