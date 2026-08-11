"use client";

import {
  Pencil,
  LockKeyhole,
  Bell,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Plus,
} from "lucide-react";

interface ProfileDetailsProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  return (
    <section className="min-w-0 flex-1 bg-white px-8 py-7">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black">
            Profile Details
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Manage your personal information and account details
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Pencil size={17} strokeWidth={1.8} />
          Edit Profile
        </button>
      </div>

      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

      <div className="mt-7 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-base font-semibold text-black">
          Personal Information
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
          {/* First Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              First Name
            </label>

            <div className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-black">
              {user?.firstName || "Shivdeep"}
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Last Name
            </label>

            <div className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-black">
              {user?.lastName || "Raina"}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Email Address
            </label>

            <div className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-black">
              {user?.email || "user@example.com"}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Phone Number
            </label>

            <div className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-black">
              {user?.phone || "+91 98765 43210"}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Date of Birth
            </label>

            <div className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-black">
              Not added
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Gender
            </label>

            <div className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-black">
              Not added
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ACCOUNT + NOTIFICATIONS
      ===================================================== */}

      <div className="mt-5 grid grid-cols-2 gap-5">
        {/* Account Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <LockKeyhole size={19} strokeWidth={1.8} />

            <h2 className="text-base font-semibold text-black">
              Account Information
            </h2>
          </div>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Password</span>

              <div className="flex items-center gap-4">
                <span className="text-gray-600">********</span>

                <button
                  type="button"
                  className="flex items-center gap-1 font-medium text-black"
                >
                  Change Password
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Account Created</span>

              <span className="text-black">11 Aug 2026</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Last Login</span>

              <span className="text-black">Recently</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Account Status</span>

              <span className="rounded-md bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <Bell size={19} strokeWidth={1.8} />

            <h2 className="text-base font-semibold text-black">
              Notification Preferences
            </h2>
          </div>

          <div className="mt-5">
            <NotificationRow label="Order Updates" enabled={true} />

            <NotificationRow label="Promotions & Offers" enabled={true} />

            <NotificationRow label="New Arrivals" enabled={true} />

            <NotificationRow label="Newsletter" enabled={false} />
          </div>
        </div>
      </div>

      {/* =====================================================
          PAYMENT + PRIVACY
      ===================================================== */}

      <div className="mt-5 grid grid-cols-2 gap-5">
        {/* Saved Payment Methods */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <CreditCard size={19} strokeWidth={1.8} />

            <h2 className="text-base font-semibold text-black">
              Saved Payment Methods
            </h2>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-xs font-bold text-white">
                UPI
              </div>

              <div>
                <p className="text-sm font-semibold text-black">UPI</p>

                <p className="mt-1 text-xs text-gray-500">
                  Payment method saved
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                Default
              </span>

              <ChevronRight size={17} />
            </div>
          </div>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
          >
            <Plus size={17} />
            Add New Payment Method
          </button>
        </div>

        {/* Privacy & Security */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={19} strokeWidth={1.8} />

            <h2 className="text-base font-semibold text-black">
              Privacy & Security
            </h2>
          </div>

          <div className="mt-5">
            <NotificationRow
              label="Two-Factor Authentication"
              enabled={false}
            />

            <NotificationRow label="Login Alerts" enabled={true} />

            <div className="flex items-center justify-between border-b border-gray-100 py-3 text-sm">
              <span className="text-gray-600">Active Sessions</span>

              <button
                type="button"
                className="flex items-center gap-1 font-medium text-black"
              >
                2 Devices
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   NOTIFICATION ROW
========================================================= */

function NotificationRow({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3">
      <span className="text-sm text-gray-600">{label}</span>

      <div
        className={`flex h-6 w-11 items-center rounded-full p-1 ${
          enabled ? "justify-end bg-black" : "justify-start bg-gray-200"
        }`}
      >
        <div className="h-4 w-4 rounded-full bg-white" />
      </div>
    </div>
  );
}
