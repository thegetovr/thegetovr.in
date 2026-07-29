"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { useCartStore } from "@/stores/cartStore";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
          <Link href="/" className="transition-colors hover:text-white">
            Shop
          </Link>

          <Link href="/studio" className="transition-colors hover:text-white">
            Studio
          </Link>

          <Link href="/about" className="transition-colors hover:text-white">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <button className="text-sm text-gray-300 transition hover:text-white">
            Search
          </button>

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
