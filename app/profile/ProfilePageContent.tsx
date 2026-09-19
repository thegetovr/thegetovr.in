"use client";

import { AnimatePresence, motion } from "framer-motion";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import MyOrders from "@/components/profile/MyOrders";
import Addresses from "@/components/profile/Address";
import ProfileDetails from "@/components/profile/ProfileDetails";
import Wishlist from "@/components/profile/Wishlist";
import ProfileEdit from "@/components/profile/ProfileEdit";
import GetOvrCollection from "@/components/profile/GetOvrCollection";
import Security from "@/components/profile/Security";

import GetOvrLoader from "@/components/animations/GetOvrLoader";

import { useCartStore } from "@/stores/cartStore";

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

const contentVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

export default function ProfilePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const deactivateAccount = useCartStore((state) => state.deactivateAccount);

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
          deactivateAccount();
        }
      } catch (error) {
        console.error("Session Check Error:", error);

        setUser(null);
        deactivateAccount();
      } finally {
        setLoadingUser(false);
      }
    };

    checkSession();
  }, [deactivateAccount]);

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
        // =================================================
        // HIDE ACTIVE CART
        //
        // Saved cart remains stored against the user's ID.
        // =================================================

        deactivateAccount();

        setUser(null);

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
    return <GetOvrLoader />;
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

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center gap-3 text-sm text-zinc-500"
        >
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

          <motion.span
            key={activeSection}
            initial={{
              opacity: 0,
              x: 8,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="text-zinc-900"
          >
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
          </motion.span>
        </motion.div>

        {/* Heading */}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pb-6 pt-4"
          >
            <h1 className="font-serif text-5xl font-medium tracking-tight text-black md:text-6xl">
              {getPageTitle()}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600">
              {getPageDescription()}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="mx-auto max-w-[1440px] px-4 pb-16">
        <div className="grid items-start gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* =================================================
              LEFT SIDEBAR
          ================================================= */}

          <motion.aside
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            <ProfileSidebar
              user={user}
              onLogout={handleLogout}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.25,
              }}
            >
              <GetOvrCollection />
            </motion.div>
          </motion.aside>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <section className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSection}-${searchParams.get("edit") || "view"}`}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
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

                {activeSection === "security" && <Security user={user} />}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}
