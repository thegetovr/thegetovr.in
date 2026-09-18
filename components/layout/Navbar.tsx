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
  ShoppingBag,
  Headphones,
  LogOut,
  MapPin,
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

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

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

  const [user, setUser] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // =====================================================
  // CLOSE MOBILE DRAWER
  // =====================================================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // =====================================================
  // USER SESSION
  // =====================================================

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          cache: "no-store",
        });

        const result = await response.json();

        if (result.success) {
          setUser(result.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Navbar Session Error:", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    checkSession();
  }, [pathname]);

  // =====================================================
  // BODY SCROLL LOCK
  // =====================================================

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        setUser(null);
        closeMobileMenu();

        const message = result.message || "Logout Successful";

        window.dispatchEvent(
          new CustomEvent("auth-notification", {
            detail: {
              message,
              type: "success",
            },
          }),
        );

        router.push("/");
      } else {
        setNotificationType("error");
        setNotification(result.message || "Logout failed");

        setTimeout(() => {
          setNotification("");
        }, 2000);
      }
    } catch (error) {
      console.error("Logout Error:", error);

      setNotificationType("error");
      setNotification("Something went wrong");

      setTimeout(() => {
        setNotification("");
      }, 2000);
    }
  };

  // =====================================================
  // ADMIN
  // =====================================================

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* =====================================================
          NOTIFICATION
      ===================================================== */}

      {notification && (
        <div
          className={`fixed left-4 right-4 top-24 z-[100] flex items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3 shadow-[var(--shadow-soft)] sm:left-auto sm:right-6 sm:max-w-md sm:px-5 sm:py-4 ${
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

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-page)/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          {/* =================================================
              LOGO
          ================================================= */}

          <div className="shrink-0">
            <Logo />
          </div>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

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
                  className={`relative flex h-20 items-center text-sm font-medium transition-colors ${
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

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="flex h-full items-center gap-2 sm:gap-4 md:gap-6">
            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="group relative hidden lg:block">
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

            {/* =================================================
                DESKTOP PROFILE
            ================================================= */}

            <div className="group relative hidden h-full md:flex">
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

            {/* =================================================
                WISHLIST
            ================================================= */}

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden h-10 w-10 items-center justify-center text-(--color-text-primary) transition-colors hover:text-(--color-text-secondary) md:flex"
            >
              <Heart size={21} strokeWidth={1.8} />
            </Link>

            {/* =================================================
                CART
            ================================================= */}

            <div className="group relative">
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="flex items-center justify-center p-1 text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary)"
              >
                <ShoppingCart size={24} strokeWidth={1.8} />

                {totalQuantity > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--color-text-primary) px-1 text-[10px] font-bold text-(--color-white)">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>

            {/* =================================================
                MOBILE HAMBURGER
            ================================================= */}

            <button
              type="button"
              aria-label={
                mobileMenuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex items-center justify-center p-1 text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary) md:hidden"
            >
              {mobileMenuOpen ? (
                <X size={25} strokeWidth={1.8} />
              ) : (
                <Menu size={25} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] md:hidden">
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobileMenu}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          />

          {/* DRAWER */}

          <aside className="absolute right-0 top-0 flex h-[100dvh] w-[78%] max-w-[340px] flex-col overflow-y-auto bg-(--color-page) shadow-[-10px_0_35px_rgba(0,0,0,0.12)] animate-[slideInRight_0.28s_ease-out]">
            {/* =================================================
                DRAWER HEADER
            ================================================= */}

            <div className="flex min-h-20 shrink-0 items-center justify-between border-b border-(--color-border) px-5 sm:px-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--color-text-muted)">
                  Menu
                </p>

                <h2 className="mt-1 text-lg font-semibold text-(--color-text-primary)">
                  The GetOvr
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMobileMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
              >
                <X size={23} strokeWidth={1.8} />
              </button>
            </div>

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <div className="px-5 py-4 sm:px-6">
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
                      className={`flex items-center justify-between border-b border-(--color-border) py-4 text-sm font-medium uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? "text-(--color-text-primary)"
                          : "text-(--color-text-secondary)"
                      }`}
                    >
                      {link.name}

                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                ACCOUNT
            ================================================= */}

            <div className="border-t border-(--color-border) px-5 py-5 sm:px-6">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-(--color-text-muted)">
                Account
              </p>

              {loadingUser ? (
                <div className="rounded-sm bg-(--color-surface-muted) px-4 py-4">
                  <p className="text-sm text-(--color-text-muted)">
                    Checking account...
                  </p>
                </div>
              ) : user ? (
                <>
                  {/* USER INFO */}

                  <div className="mb-3 flex items-center gap-3 rounded-sm bg-(--color-surface-muted) px-4 py-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-text-primary) text-white">
                      <User size={18} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-(--color-text-primary)">
                        {user.firstName} {user.lastName}
                      </p>

                      <p className="truncate text-xs text-(--color-text-muted)">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                  >
                    <User
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    My Profile
                  </Link>

                  <Link
                    href="/profile?tab=orders"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                  >
                    <ShoppingBag
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    My Orders
                  </Link>

                  <Link
                    href="/profile?tab=wishlist"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                  >
                    <Heart
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    Wishlist
                  </Link>

                  <Link
                    href="/track-order"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                  >
                    <MapPin
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    Track Order
                  </Link>

                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                  >
                    <Headphones
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    Contact Us
                  </Link>

                  <div className="my-2 border-t border-(--color-border)" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-error) transition-colors hover:bg-(--color-error-background)"
                  >
                    <LogOut
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* LOGIN / SIGNUP */}

                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="mb-3 flex w-full items-center justify-center rounded-sm border border-(--color-accent) px-5 py-3.5 text-sm font-semibold text-(--color-accent) transition-colors hover:bg-(--color-accent) hover:text-white"
                  >
                    LOGIN / SIGNUP
                  </Link>

                  <Link
                    href="/login?redirect=/profile%3Ftab%3Dorders"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                  >
                    <ShoppingBag
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    Orders
                  </Link>

                  <Link
                    href="/track-order"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                  >
                    <MapPin
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    Track Order
                  </Link>

                  <Link
                    href="/login?redirect=%2Fprofile%3Ftab%3Dwishlist"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                  >
                    <Heart
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    Wishlist
                  </Link>

                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-sm text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                  >
                    <Headphones
                      size={18}
                      strokeWidth={1.8}
                      className="text-(--color-text-muted)"
                    />
                    Contact Us
                  </Link>
                </>
              )}
            </div>

            {/* =================================================
                DRAWER FOOTER
            ================================================= */}

            <div className="mt-auto border-t border-(--color-border) px-5 py-5 sm:px-6">
              <p className="text-center text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted)">
                The GetOvr
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* =====================================================
          DRAWER ANIMATION
      ===================================================== */}

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
