"use client";

import {
  LayoutDashboard,
  Box,
  MapPin,
  User,
  Heart,
  LogOut,
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
    label: "Overview",
    section: "overview",
    icon: LayoutDashboard,
  },
  {
    label: "My Orders",
    section: "orders",
    icon: Box,
  },
  {
    label: "Addresses",
    section: "addresses",
    icon: MapPin,
  },
  {
    label: "Profile Details",
    section: "profile",
    icon: User,
  },
  {
    label: "Wishlist",
    section: "wishlist",
    icon: Heart,
  },
];

export default function ProfileSidebar({
  user,
  onLogout,
  activeSection,
  onSectionChange,
}: ProfileSidebarProps) {
  return (
    <div className="p-5">
      {/* User Avatar */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl font-medium text-white">
        {user?.firstName?.charAt(0).toUpperCase() || "U"}
      </div>

      {/* User Name */}
      <h2 className="mt-2 text-center text-lg font-semibold">
        {user ? `${user.firstName} ${user.lastName}` : "User"}
      </h2>

      {/* User Email */}
      <p className="mt-1 text-center text-sm text-gray-500">
        {user ? user.email : "user@example.com"}
      </p>

      {/* Navigation */}
      <div className="mt-5 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.section;

          return (
            <button
              key={item.section}
              onClick={() => onSectionChange(item.section)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-2 w-full border-t border-gray-300" />

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium hover:bg-gray-100"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
}
