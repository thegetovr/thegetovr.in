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
    <aside className="w-full min-w-0 rounded-xl border border-zinc-200 bg-white p-3 sm:p-4">
      {/* =====================================================
          USER
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-3 px-2 py-3 sm:gap-4 sm:px-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee3d5] font-serif text-base font-semibold text-zinc-800 sm:h-14 sm:w-14 sm:text-lg">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-black sm:text-[15px]">
            {fullName}
          </h2>

          <p className="mt-1 truncate text-xs text-zinc-500">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="mt-2 grid grid-cols-2 gap-2 lg:mt-3 lg:block lg:space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.section;

          return (
            <button
              key={item.section}
              type="button"
              onClick={() => onSectionChange(item.section)}
              className={`flex min-w-0 w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm transition sm:gap-3 sm:px-4 ${
                isActive
                  ? "bg-[#eee3d5] font-medium text-black"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <Icon size={18} strokeWidth={1.7} className="shrink-0" />

              <span className="min-w-0 truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <div className="mt-3 border-t border-zinc-200 pt-3 lg:mt-2 lg:pt-2">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full min-w-0 items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 sm:px-4"
        >
          <LogOut size={18} strokeWidth={1.7} className="shrink-0" />

          <span>Log Out</span>
        </button>
      </div>

      {/* =====================================================
          SUPPORT CARD
      ===================================================== */}

      <div className="mt-4 hidden rounded-lg border border-zinc-200 bg-[#fcfbf9] p-5 lg:block">
        <div className="flex items-start gap-4">
          <Headphones size={26} strokeWidth={1.5} className="shrink-0" />

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
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
