"use client";
import {
  LayoutDashboard,
  Box,
  MapPin,
  User,
  Heart,
  Truck,
  LogOut,
} from "lucide-react";
export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <aside className="w-64 border-r border-gray-200">
        <div className="p-5">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl font-medium text-white">
            S
          </div>

          <h2 className="mt-2 text-center text-lg font-semibold">
            Shivdeep Raina
          </h2>

          <p className="mt-1 text-center text-sm text-gray-500">
            shivdeepraina@example.com
          </p>

          <div className="mt-5">
            <button className="flex w-full items-center gap-3 rounded-lg bg-black px-4 py-3 text-left text-sm font-medium text-white">
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </button>
          </div>

          <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium hover:bg-gray-100">
            <Box size={18} />
            <span>My Orders</span>
          </button>

          <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium hover:bg-gray-100">
            <MapPin size={18} />
            <span>Addresses</span>
          </button>

          <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium hover:bg-gray-100">
            <User size={18} />
            <span>Profile Details</span>
          </button>

          <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium hover:bg-gray-100">
            <Heart size={18} />
            <span>Wishlist</span>
          </button>
          <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium hover:bg-gray-100">
            <Truck size={18} />
            <span>Track Order</span>
          </button>

          <div className="my-2 w-full border-t border-gray-300"></div>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium hover:bg-gray-100">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </main>
  );
}
