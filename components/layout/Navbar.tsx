import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
          <Link
            href="/"
            className="transition-colors hover:text-white"
          >
            Shop
          </Link>

          <Link
            href="/studio"
            className="transition-colors hover:text-white"
          >
            Studio
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-white"
          >
            About
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <button className="text-sm text-gray-300 transition hover:text-white">
            Search
          </button>

          <button className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-white/20 hover:bg-white/5">
            Cart (0)
          </button>

        </div>
      </div>
    </header>
  );
}