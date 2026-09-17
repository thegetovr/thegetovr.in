"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";

import UserDropdown from "@/components/layout/UserDropdown";
import Logo from "@/components/ui/Logo";
import { useCartStore } from "@/stores/cartStore";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Studio", href: "/studio" },
  { name: "About", href: "/about" },
  { name: "Reviews", href: "/reviews" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

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

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {notification && (
        <div
          className={`fixed right-4 top-20 z-[60] flex items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3 shadow-[var(--shadow-soft)] sm:right-6 sm:top-24 sm:px-5 sm:py-4 ${
            notificationType === "success"
              ? "border-(--color-success) bg-(--color-success-background) text-(--color-success)"
              : "border-(--color-error) bg-(--color-error-background) text-(--color-error)"
          }`}
        >
          <span className="text-base">
            {notificationType === "success" ? "✓" : "!"}
          </span>

          <p className="text-sm font-medium">{notification}</p>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-page)/95 backdrop-blur-md">
        <div className="flex h-[74px] w-full items-center gap-8 px-6 sm:px-8 lg:px-10 xl:px-14">
          <div className="shrink-0">
            <Logo />
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex xl:gap-10">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex h-[74px] items-center text-sm font-medium transition-colors ${
                    isActive
                      ? "text-(--color-text-primary)"
                      : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-(--color-text-primary) transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="relative hidden xl:block">
              <Search
                size={18}
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
              />

              <input
                type="text"
                placeholder="Search for products..."
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
                className="w-56 rounded-full border border-(--color-border) bg-(--color-page) py-2.5 pl-11 pr-4 text-sm text-(--color-text-primary) placeholder:text-(--color-text-muted) outline-none transition-all duration-300 focus:w-64 focus:border-(--color-text-primary)"
              />
            </div>

            <div className="group relative flex h-[74px]">
              <button
                type="button"
                aria-label="Account"
                className="flex h-full w-10 items-center justify-center text-(--color-text-primary) transition-colors hover:text-(--color-text-secondary)"
              >
                <User size={21} strokeWidth={1.8} />
              </button>

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

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden h-10 w-10 items-center justify-center text-(--color-text-primary) transition-colors hover:text-(--color-text-secondary) sm:flex"
            >
              <Heart size={21} strokeWidth={1.8} />
            </Link>

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="relative flex h-10 w-10 items-center justify-center text-(--color-text-primary) transition-colors hover:text-(--color-text-secondary)"
            >
              <ShoppingCart size={21} strokeWidth={1.8} />

              {totalQuantity > 0 && (
                <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-(--color-text-primary) px-1 text-[9px] font-bold text-(--color-white)">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={
                mobileMenuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center text-(--color-text-primary) lg:hidden"
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={1.8} />
              ) : (
                <Menu size={22} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-(--color-border) bg-(--color-page) lg:hidden">
            <div className="px-6 py-4 sm:px-8">
              <div className="mb-4">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
                  />

                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        const value = event.currentTarget.value.trim();

                        closeMobileMenu();

                        if (value) {
                          router.push(
                            `/shop?search=${encodeURIComponent(value)}`,
                          );
                        } else {
                          router.push("/shop");
                        }
                      }
                    }}
                    className="w-full rounded-full border border-(--color-border) py-3 pl-11 pr-4 text-sm outline-none focus:border-(--color-text-primary)"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href ||
                        pathname.startsWith(`${link.href}/`);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`border-b border-(--color-border) py-4 text-sm font-semibold uppercase tracking-[0.15em] last:border-b-0 ${
                        isActive
                          ? "text-(--color-text-primary)"
                          : "text-(--color-text-secondary)"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.name}

                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-(--color-text-primary)" />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
