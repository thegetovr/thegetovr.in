"use client";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ShoppingBag, Search } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Shop", href: "/" },
  { name: "Studio", href: "/studio" },
  { name: "About", href: "/about" },
];

const cartCount = 1;

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-black backdrop-blur-xl">
      <div className="mx-auto flex items-center h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <Logo />

        <nav className="hidden h-full items-center gap-8 text-md  text-white md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative flex h-full items-center t
              ransition-colors duration-200 hover:text-white"
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
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className=" group relative hidden lg:block">
            <Search
              size={22}
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
                    
                   focus:border-white/60
                   focus:bg-white/15
      "
            />
          </div>

          <div className="relative cursor-pointer">
            <button className="text-gray-300 transition hover:text-white">
              <ShoppingBag size={24} strokeWidth={1.8} />
            </button>

            {cartCount > 0 && (
              <span
                className="absolute -right-2 -top-2 flex h-5 
                   min-w-[20px] items-center justify-center rounded-full
                  bg-white px-1 text-[10px] font-bold text-black"
              >
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
