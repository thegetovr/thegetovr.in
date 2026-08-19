"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";

import UserDropdown from "@/components/layout/UserDropdown";
import Logo from "@/components/ui/Logo";
import { useCartStore } from "@/stores/cartStore";

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Studio", href: "/studio" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const readyMadeItems = useCartStore((state) => state.readyMadeItems);

  const pathname = usePathname();
  const router = useRouter();

  const totalQuantity =
    items.reduce((total, item) => total + item.quantity, 0) +
    readyMadeItems.reduce((total, item) => total + item.quantity, 0);

  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );

  // =====================================================
  // AUTH NOTIFICATION
  // =====================================================

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const showNotification = (message: string, type: "success" | "error") => {
      setNotificationType(type);
      setNotification(message);

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setNotification("");
      }, 2000);
    };

    const handleAuthNotification = (event: Event) => {
      const customEvent = event as CustomEvent<{
        message: string;
        type: "success" | "error";
      }>;

      if (!customEvent.detail?.message) {
        return;
      }

      showNotification(
        customEvent.detail.message,
        customEvent.detail.type || "success",
      );
    };

    window.addEventListener("auth-notification", handleAuthNotification);

    return () => {
      window.removeEventListener("auth-notification", handleAuthNotification);

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  // =====================================================
  // ADMIN
  // =====================================================

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* =================================================
          NOTIFICATION
      ================================================= */}

      {notification && (
        <div
          className={`fixed right-6 top-24 z-50 flex items-center gap-3 rounded-[var(--radius-sm)] border px-5 py-4 shadow-[var(--shadow-soft)] ${
            notificationType === "success"
              ? "border-(--color-success) bg-(--color-success-background) text-(--color-success)"
              : "border-(--color-error) bg-(--color-error-background) text-(--color-error)"
          }`}
        >
          <span className="text-xl">
            {notificationType === "success" ? "✓" : "!"}
          </span>

          <p className="text-sm font-medium">{notification}</p>
        </div>
      )}

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-page)/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          <Logo />

          {/* Navigation */}

          <nav className="hidden h-full items-center gap-8 text-md text-(--color-text-primary) md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex h-full items-center transition-colors duration-200 hover:text-(--color-text-secondary)"
              >
                {link.name}

                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-(--color-text-primary) transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side */}

          <div className="flex h-full items-center gap-6">
            {/* Search */}

            <div className="group relative hidden lg:block">
              <Search
                size={21}
                aria-hidden="true"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-(--color-text-secondary) transition-colors duration-300 group-focus-within:text-(--color-text-primary)"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    const value = event.currentTarget.value.trim();

                    if (value) {
                      router.push(`/shop?search=${encodeURIComponent(value)}`);
                    } else {
                      router.push("/shop");
                    }
                  }
                }}
                className="w-100 rounded-full border border-(--color-input-border) bg-(--color-input-background) py-2.5 pl-11 pr-5 text-sm text-(--color-text-primary) placeholder:text-(--color-input-placeholder) outline-none transition-all duration-300 focus:border-(--color-input-focus) focus:placeholder:opacity-0"
              />
            </div>

            {/* Profile */}

            <div className="group relative flex h-full">
              <button
                type="button"
                aria-label="Account"
                className="flex h-full items-center justify-center px-2 text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary)"
              >
                <User size={24} strokeWidth={1.8} />
              </button>

              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-(--color-text-primary) transition-all duration-300 ease-out group-hover:w-full" />

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

            <div className="group relative">
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="flex items-center justify-center text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary)"
              >
                <ShoppingCart size={24} strokeWidth={1.8} />

                {totalQuantity > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--color-text-primary) px-1 text-[10px] font-bold text-(--color-white)">
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
