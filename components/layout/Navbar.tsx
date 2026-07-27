"use client";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

import { ShoppingBag, Search, User } from "lucide-react";
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
            <div
              className="absolute
                         left-1/2
                        top-full 
                        -translate-x-1/2 
                        hidden
                        group-hover:block 
                        z-50 
                        
                        "
            >
              <div className="  w-72 rounded-xl border border-white/20 bg-black shadow-2xl">
                <div className="px-5 py-4">
                  <h3 className="text-base font-semibold text-white">
                    Welcome
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-400">
                    To access account and manage orders
                  </p>

                  <Link
                    href="/login"
                    className="mt-4 inline-flex items-center justify-center
                     rounded-md border border-[#F4B400] py-2.5 px-8 text-sm font-semibold
                    text-[#F4B400] transition-all duration-300 hover:bg-[#F4B400] hover:text-white"
                  >
                    LOGIN / SIGNUP
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/*Carrt */}
          <div className="relative group">
            <button className="flex items-center justify-center text-gray-300 transition hover:text-white">
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
