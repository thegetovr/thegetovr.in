"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
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

const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rightItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.header
        initial={{
          opacity: 0,
          y: -18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="sticky top-0 z-50 border-b border-(--color-border)/70 bg-(--color-page)/92 backdrop-blur-md"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          {/* =================================================
              LOGO
          ================================================= */}

          <motion.div
            className="shrink-0"
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Logo />
          </motion.div>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-9"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <motion.div key={link.href} variants={navItemVariants}>
                  <Link
                    href={link.href}
                    className={`group relative flex h-20 items-center text-sm font-medium transition-colors ${
                      isActive
                        ? "text-(--color-text-primary)"
                        : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                    }`}
                  >
                    {link.name}

                    {/* ACTIVE + HOVER UNDERLINE */}

                    <span
                      className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-(--color-text-primary) transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <motion.div
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex h-full items-center gap-2 sm:gap-4 md:gap-6"
          >
            {/* =================================================
                SEARCH
            ================================================= */}

            <motion.div
              variants={rightItemVariants}
              className="group relative hidden lg:block"
            >
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
            </motion.div>

            {/* =================================================
                DESKTOP PROFILE
            ================================================= */}

            <motion.div
              variants={rightItemVariants}
              className="group relative hidden h-full md:flex"
            >
              <button
                type="button"
                aria-label="Account"
                className="relative flex h-full w-10 items-center justify-center text-(--color-text-primary) transition-colors hover:text-(--color-text-secondary)"
              >
                <motion.span
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <User size={21} strokeWidth={1.8} />
                </motion.span>

                {/* HOVER UNDERLINE */}

                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-(--color-text-primary) transition-all duration-300 group-hover:w-full" />
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
            </motion.div>

            {/* =================================================
                WISHLIST
            ================================================= */}

            <motion.div variants={rightItemVariants}>
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="hidden h-10 w-10 items-center justify-center text-(--color-text-primary) transition-colors hover:text-(--color-text-secondary) md:flex"
              >
                <motion.span
                  whileHover={{
                    scale: 1.1,
                    rotate: -4,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Heart size={21} strokeWidth={1.8} />
                </motion.span>
              </Link>
            </motion.div>

            {/* =================================================
                CART
            ================================================= */}

            <motion.div variants={rightItemVariants} className="group relative">
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="flex items-center justify-center p-1 text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary)"
              >
                <motion.span
                  whileHover={{
                    scale: 1.08,
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <ShoppingCart size={24} strokeWidth={1.8} />
                </motion.span>

                <AnimatePresence>
                  {totalQuantity > 0 && (
                    <motion.span
                      key={totalQuantity}
                      initial={{
                        scale: 0.5,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 18,
                      }}
                      className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--color-text-primary) px-1 text-[10px] font-bold text-(--color-white)"
                    >
                      {totalQuantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>

            {/* =================================================
                MOBILE HAMBURGER
            ================================================= */}

            <motion.div variants={rightItemVariants}>
              <button
                type="button"
                aria-label={
                  mobileMenuOpen ? "Close navigation" : "Open navigation"
                }
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="flex items-center justify-center p-1 text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary) md:hidden"
              >
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? 90 : 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  {mobileMenuOpen ? (
                    <X size={25} strokeWidth={1.8} />
                  ) : (
                    <Menu size={25} strokeWidth={1.8} />
                  )}
                </motion.span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                  },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.25,
                  },
                },
              }}
            />

            {/* DRAWER */}

            <motion.aside
              className="absolute right-0 top-0 flex h-[100dvh] w-[78%] max-w-[340px] flex-col overflow-y-auto bg-(--color-page) shadow-[-10px_0_35px_rgba(0,0,0,0.12)]"
              variants={{
                hidden: {
                  x: "100%",
                },
                visible: {
                  x: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
                exit: {
                  x: "100%",
                  transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {/* =================================================
                  DRAWER HEADER
              ================================================= */}

              <div className="flex min-h-20 shrink-0 items-center justify-between border-b border-(--color-border) px-5 sm:px-6">
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.35,
                  }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--color-text-muted)">
                    Menu
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-(--color-text-primary)">
                    The GetOvr
                  </h2>
                </motion.div>

                <motion.button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMobileMenu}
                  whileHover={{
                    rotate: 90,
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text-primary)"
                >
                  <X size={23} strokeWidth={1.8} />
                </motion.button>
              </div>

              {/* =================================================
                  NAVIGATION
              ================================================= */}

              <div className="px-5 py-4 sm:px-6">
                <motion.div
                  className="flex flex-col"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        delayChildren: 0.15,
                        staggerChildren: 0.06,
                      },
                    },
                  }}
                >
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname === link.href ||
                          pathname.startsWith(`${link.href}/`);

                    return (
                      <motion.div
                        key={link.href}
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: 15,
                          },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: {
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                      >
                        <Link
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
                            <motion.span
                              layoutId="mobile-active-dot"
                              className="h-1.5 w-1.5 rounded-full bg-(--color-accent)"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* =================================================
                  ACCOUNT
              ================================================= */}

              <motion.div
                className="border-t border-(--color-border) px-5 py-5 sm:px-6"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.35,
                }}
              >
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

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.45,
                        duration: 0.3,
                      }}
                      className="mb-3 flex items-center gap-3 rounded-sm bg-(--color-surface-muted) px-4 py-3.5"
                    >
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
                    </motion.div>

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
              </motion.div>

              {/* =================================================
                  DRAWER FOOTER
              ================================================= */}

              <motion.div
                className="mt-auto border-t border-(--color-border) px-5 py-5 sm:px-6"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.35,
                }}
              >
                <p className="text-center text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted)">
                  The GetOvr
                </p>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
