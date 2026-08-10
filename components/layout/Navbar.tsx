"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User, ShoppingCart, Search } from "lucide-react";
import UserDropdown from "@/components/layout/UserDropdown";

import Logo from "@/components/ui/Logo";
import { useCartStore } from "@/stores/cartStore";

const navLinks = [
  { name: "Shop", href: "/Shop" },
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

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const [search, setSearch] = useState("");
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

      setTimeout(() => {
        setNotification("");
      }, 2000);
    }
  }, []);

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

            {/* Profile */}
            <div className="group relative flex h-full ">
              <button
                className="flex h-full items-center justify-center px-2
               text-gray-300 transition hover:text-white"
              >
                <User size={24} strokeWidth={1.8} />
              </button>

              <span
                className="
                absolute
                bottom-0
                left-1/2
                h-[2px]
                w-0
                -translate-x-1/2
                bg-white
                transition-all
                duration-300
                ease-out
                group-hover:w-full
              "
              />

              {/* Dropdown */}
              <UserDropdown
                onNotification={(message, type) => {
                  setNotification(message);
                  setNotificationType(type);
                  setTimeout(() => {
                    setNotification("");
                  }, 2000);
                }}
              />
            </div>

            {/* Cart */}
            <div className="relative group">
              <Link
                href="/cart"
                className="flex items-center justify-center text-gray-300 transition hover:text-white"
              >
                <ShoppingCart size={24} strokeWidth={1.8}></ShoppingCart>

                {totalQuantity > 0 && (
                  <span
                    className="absolute -right-2 -top-2 flex h-5 
                   min-w-[20px] items-center justify-center rounded-full
                  bg-white px-1 text-[10px] font-bold text-black"
                  >
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
