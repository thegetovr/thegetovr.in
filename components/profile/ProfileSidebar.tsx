"use client";

import {
  Package,
  MapPin,
  User,
  Heart,
  LogOut,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ProfileSidebarProps {
  user: UserData | null;
  onLogout: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    label: "Profile",
    section: "profile",
    icon: User,
  },
  {
    label: "My Orders",
    section: "orders",
    icon: Package,
  },
  {
    label: "Addresses",
    section: "addresses",
    icon: MapPin,
  },
  {
    label: "Wishlist",
    section: "wishlist",
    icon: Heart,
  },
  {
    label: "Security",
    section: "security",
    icon: ShieldCheck,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProfileSidebar({
  user,
  onLogout,
  activeSection,
  onSectionChange,
}: ProfileSidebarProps) {
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "User";

  const initials = user
    ? `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`.toUpperCase()
    : "U";

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.65,
        ease,
      }}
      className="w-full min-w-0 rounded-xl border border-zinc-200 bg-white p-3 sm:p-4"
    >
      {/* =====================================================
          USER
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.12,
          ease,
        }}
        className="flex min-w-0 items-center gap-3 px-2 py-3 sm:gap-4 sm:px-3"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.18,
            ease,
          }}
          whileHover={{
            scale: 1.06,
            rotate: 2,
            transition: { duration: 0.2 },
          }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee3d5] font-serif text-base font-semibold text-zinc-800 sm:h-14 sm:w-14 sm:text-lg"
        >
          {initials}
        </motion.div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-black sm:text-[15px]">
            {fullName}
          </h2>

          <p className="mt-1 truncate text-xs text-zinc-500">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </motion.div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="mt-2 grid grid-cols-2 gap-2 lg:mt-3 lg:block lg:space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.section;

          return (
            <motion.button
              key={item.section}
              type="button"
              onClick={() => onSectionChange(item.section)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.25 + index * 0.06,
                ease,
              }}
              whileHover={{
                x: 4,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
              whileTap={{
                scale: 0.97,
              }}
              className={`relative flex min-w-0 w-full items-center gap-2 overflow-hidden rounded-lg px-3 py-3 text-left text-sm sm:gap-3 sm:px-4 ${
                isActive ? "font-medium text-black" : "text-zinc-700"
              }`}
            >
              {/* Animated active background */}

              {isActive && (
                <motion.span
                  layoutId="profile-active-menu"
                  className="absolute inset-0 rounded-lg bg-[#eee3d5]"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                  }}
                />
              )}

              {/* Hover background */}

              {!isActive && (
                <span className="absolute inset-0 rounded-lg bg-zinc-100 opacity-0 transition-opacity duration-200 hover:opacity-100" />
              )}

              {/* Left active indicator */}

              {isActive && (
                <motion.span
                  layoutId="profile-active-indicator"
                  className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#b7965d]"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              {/* Icon */}

              <motion.span
                animate={
                  isActive
                    ? {
                        scale: 1.08,
                      }
                    : {
                        scale: 1,
                      }
                }
                transition={{
                  duration: 0.25,
                }}
                className="relative z-10 flex shrink-0"
              >
                <Icon size={18} strokeWidth={1.7} />
              </motion.span>

              {/* Label */}

              <span className="relative z-10 min-w-0 truncate">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.6,
        }}
        className="mt-3 border-t border-zinc-200 pt-3 lg:mt-2 lg:pt-2"
      >
        <motion.button
          type="button"
          onClick={onLogout}
          whileHover={{
            x: 4,
            transition: {
              duration: 0.2,
            },
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="flex w-full min-w-0 items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 sm:px-4"
        >
          <LogOut size={18} strokeWidth={1.7} className="shrink-0" />

          <span>Log Out</span>
        </motion.button>
      </motion.div>

      {/* =====================================================
          SUPPORT CARD
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.65,
          ease,
        }}
        className="mt-4 hidden rounded-lg border border-zinc-200 bg-[#fcfbf9] p-5 lg:block"
      >
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{
              rotate: 5,
              scale: 1.05,
            }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <Headphones size={26} strokeWidth={1.5} />
          </motion.div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-black">Need help?</h3>

            <p className="mt-1 text-xs text-zinc-500">
              We&apos;re here for you.
            </p>

            <button
              type="button"
              className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-black underline underline-offset-4"
            >
              Contact Support
              <motion.span whileHover={{ x: 5 }} className="flex">
                <ArrowRight size={13} />
              </motion.span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
