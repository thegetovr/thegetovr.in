"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <Link
          href="/"
          className="text-3xl font-black tracking-[0.25em]"
        >
          THE GETOVR
        </Link>

        <nav className="hidden gap-10 font-medium md:flex">

          <Link href="/">Home</Link>

          <Link href="/shop">Shop</Link>

          <Link href="/studio">Studio</Link>

          <Link href="/collections">Collections</Link>

          <Link href="/about">About</Link>

        </nav>

        <Link
          href="/studio"
          className="rounded-full border border-white px-6 py-3 transition hover:bg-white hover:text-black"
        >
          Start Designing
        </Link>

      </div>
    </header>
  );
}