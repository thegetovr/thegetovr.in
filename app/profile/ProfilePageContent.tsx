"use client";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import MyOrders from "@/components/profile/MyOrders";
import Addresses from "@/components/profile/Address";
import ProfileDetails from "@/components/profile/ProfileDetails";
import Wishlist from "@/components/profile/Wishlist";
import ProfileEdit from "@/components/profile/ProfileEdit";
import GetOvrCollection from "@/components/profile/GetOvrCollection";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
}

export default function ProfilePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // =====================================================
  // ACTIVE SECTION
  // =====================================================

  const activeSection = searchParams.get("tab") || "profile";

  // =====================================================
  // SECTION CHANGE
  // =====================================================

  const handleSectionChange = (section: string) => {
    router.push(`${pathname}?tab=${section}`, {
      scroll: false,
    });
  };

  // =====================================================
  // SESSION
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
        console.error("Session Check Error:", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    checkSession();
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

        const message = result.message || "Logout Successful";

        // Show immediately
        window.dispatchEvent(
          new CustomEvent("auth-notification", {
            detail: {
              message,
              type: "success",
            },
          }),
        );

        router.push("/");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // =====================================================
  // PAGE TITLE
  // =====================================================

  const getPageTitle = () => {
    switch (activeSection) {
      case "orders":
        return "My Orders";

      case "addresses":
        return "My Addresses";

      case "profile":
        return "My Profile";

      case "wishlist":
        return "My Wishlist";

      case "security":
        return "Security";

      default:
        return "My Profile";
    }
  };

  // =====================================================
  // PAGE DESCRIPTION
  // =====================================================

  const getPageDescription = () => {
    switch (activeSection) {
      case "orders":
        return "View and manage your recent orders.";

      case "addresses":
        return "Manage your saved delivery addresses.";

      case "profile":
        return "Manage your personal information and account settings.";

      case "wishlist":
        return "View your saved products.";

      case "security":
        return "Manage your account security here";

      default:
        return "Manage your personal information and account settings.";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingUser) {
    return (
      <main className="min-h-screen bg-[#fcfbf9]">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-zinc-500">Loading profile...</p>
        </div>
      </main>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-black">
      {/* =================================================
          TOP AREA
      ================================================= */}

      <div className="mx-auto max-w-[1440px] px-4 pt-8">
        {/* Breadcrumb */}

        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="transition hover:text-black"
          >
            Home
          </button>

          <span>›</span>

          <span>My Account</span>

          <span>›</span>

          <span className="text-zinc-900">
            {activeSection === "profile"
              ? "Profile"
              : activeSection === "orders"
                ? "My Orders"
                : activeSection === "addresses"
                  ? "Addresses"
                  : activeSection === "wishlist"
                    ? "Wishlist"
                    : activeSection === "security"
                      ? "Security"
                      : "Profile"}
          </span>
        </div>

        {/* Heading */}

        <div className="pb-6 pt-4">
          <h1 className="font-serif text-5xl font-medium tracking-tight text-black md:text-6xl">
            {getPageTitle()}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600">
            {getPageDescription()}
          </p>
        </div>
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="mx-auto max-w-[1440px] px-4 pb-16">
        <div className="grid items-start gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* =================================================
              LEFT SIDEBAR
          ================================================= */}

          <aside className="w-full">
            <ProfileSidebar
              user={user}
              onLogout={handleLogout}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />

            <GetOvrCollection />
          </aside>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <section className="min-w-0">
            {/* PROFILE */}

            {activeSection === "profile" &&
              (searchParams.get("edit") === "true" ? (
                <ProfileEdit
                  user={user}
                  onCancel={() =>
                    router.push(`${pathname}?tab=profile`, {
                      scroll: false,
                    })
                  }
                  onSaved={(updatedUser) => {
                    setUser(updatedUser);

                    router.push(`${pathname}?tab=profile`, {
                      scroll: false,
                    });
                  }}
                />
              ) : (
                <ProfileDetails user={user} />
              ))}

            {/* ORDERS */}

            {activeSection === "orders" && <MyOrders user={user} />}

            {/* ADDRESSES */}

            {activeSection === "addresses" && <Addresses />}

            {/* WISHLIST */}

            {activeSection === "wishlist" && <Wishlist />}

            {/* SECURITY */}

            {activeSection === "security" && (
              <div className="rounded-xl border border-zinc-200 bg-white p-7">
                <h2 className="font-serif text-2xl text-black">Security</h2>

                <p className="mt-3 text-sm text-zinc-500">
                  Manage your account security here.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
