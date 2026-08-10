"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User, ShoppingCart, Search } from "lucide-react";
import UserDropdown from "@/components/layout/UserDropdown";

import Logo from "@/components/ui/Logo";
import { useCartStore } from "@/stores/cartStore";

const navLinks = [
  { name: "Shop", href: "/" },
  { name: "Studio", href: "/studio" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const items = useCartStore((state) => state.items);
const readyMadeItems = useCartStore((state) => state.readyMadeItems);
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      {notification && (
        <div
          className={`fixed right-6 top-24 z-[100] flex items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl ${
            notificationType === "success"
              ? "border-green-500/40 bg-green-500/10 text-green-400"
              : "border-red-500/40 bg-red-500/10 text-red-400"
          }`}
        >
          <span className="text-xl">
            {notificationType === "success" ? "✓" : "!"}
          </span>

          <p className="text-sm font-medium">{notification}</p>
        </div>
      )}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-black backdrop-blur-xl">
        <div className="mx-auto flex items-center h-20 max-w-7xl justify-between px-8">
          {/* Logo */}
          <Logo />

          <nav className="hidden h-full items-center gap-8 text-md  text-white md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex h-full items-center 
              transition-colors duration-200 hover:text-white"
              >
                {link.name}

                <span
                  className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2
               bg-white transition-all duration-300 ease-out group-hover:w-full"
                />
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex h-full items-center gap-6">
            {/* Search Bar */}
            <div className=" group relative hidden lg:block">
              <Search
                size={24}
                className="absolute left-2 top-1/2 -translate-y-1/2
               text-gray-400 z-10 transition-colors duration-300
               group-focus-within:text-white"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                // focus:w-[300px] removed temporarily because it was causing layout shift when the input expands on focus
                className="
                     w-[400px]
                     rounded-full
                     border
                   border-white/30
                   bg-white/5
                     py-2.5
                     pl-11
                     pr-5
                     text-sm
                   text-white
                   placeholder:text-gray-400
                     placeholder:transition-opacity
                     focus:placeholder:opacity-0
                     outline-none
                     transition-all
                     duration-300
                     backdrop-blur-md
                    
                   focus:border-white/60"
              />
            </div>

          {/* User */}
          <div className="relative">
            <button
              onMouseEnter={() => setUserMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition hover:border-white/20 hover:bg-white/5"
            >
              <User size={20} strokeWidth={1.8} className="text-white" />
            </button>

            {userMenuOpen && (
              <div
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
                className="absolute right-1/2 top-full z-50 mt-3 w-72 translate-x-1/2 rounded-xl border border-white/20 bg-black shadow-2xl"
              >
                <div className="px-5 py-4">
                  <h3 className="text-base font-semibold text-white">
                    Welcome
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    To access account and manage orders
                  </p>

                  <Link
                    href="/login"
                    className="mt-4 inline-flex rounded-md border border-[#F4B400] px-8 py-2.5 text-sm font-semibold text-[#F4B400] transition hover:bg-[#F4B400] hover:text-white"
                  >
                    LOGIN / SIGNUP
                  </Link>
                </div>
              </div>
            )}
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
                <span
                  className="absolute -right-2 -top-2 flex h-5 
                   min-w-[20px] items-center justify-center rounded-full
                  bg-white px-1 text-[10px] font-bold text-black"
                >
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
