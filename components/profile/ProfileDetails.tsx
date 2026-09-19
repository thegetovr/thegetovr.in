"use client";

import Link from "next/link";
import {
  Pencil,
  Trash2,
  MapPin,
  Home,
  Package,
  Truck,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProfileUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
}

interface Address {
  _id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  isDefault: boolean;
}

interface Order {
  status?: string;
}

interface ProfileDetailsProps {
  user: ProfileUser | null;
}

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fieldContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
};

const fieldVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const summaryVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // =====================================================
  // LOAD PROFILE DATA
  // =====================================================

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const [addressResponse, orderResponse, wishlistResponse] =
          await Promise.all([
            fetch("/api/addresses", {
              cache: "no-store",
            }),

            fetch("/api/orders", {
              cache: "no-store",
            }),

            fetch("/api/wishlist", {
              cache: "no-store",
            }),
          ]);

        // =================================================
        // ADDRESSES
        // =================================================

        if (addressResponse.ok) {
          const addressData = await addressResponse.json();

          if (addressData.success) {
            setAddresses(addressData.addresses ?? []);
          }
        }

        // =================================================
        // ORDERS
        // =================================================

        if (orderResponse.ok) {
          const orderData = await orderResponse.json();

          if (orderData.success) {
            const orders: Order[] = orderData.orders ?? [];

            setTotalOrders(orders.length);

            const delivered = orders.filter(
              (order) => String(order.status).toLowerCase() === "delivered",
            ).length;

            setDeliveredOrders(delivered);
          }
        }

        // =================================================
        // WISHLIST
        // =================================================

        if (wishlistResponse.ok) {
          const wishlistData = await wishlistResponse.json();

          if (wishlistData.success) {
            const wishlist = wishlistData.wishlist ?? wishlistData.items ?? [];

            setWishlistCount(wishlist.length);
          }
        }
      } catch (error) {
        console.error("PROFILE DETAILS LOAD ERROR:", error);
      } finally {
        setLoadingAddresses(false);
      }
    };

    loadProfileData();
  }, []);

  const defaultAddress =
    addresses.find((address) => address.isDefault) ?? addresses[0];

  const formatDateOfBirth = (date?: string) => {
    if (!date) return "Not added";

    const [year, month, day] = date.split("-");

    if (!year || !month || !day) {
      return "Not added";
    }

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-w-0 space-y-5">
      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 md:p-7"
      >
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-serif text-2xl text-black">
              Personal Information
            </h2>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{
                duration: 0.45,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-2 h-[2px] bg-[#b7965d]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.2,
            }}
          >
            <Link
              href="/profile?tab=profile&edit=true"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-50 sm:w-fit sm:py-2.5"
            >
              <Pencil size={15} strokeWidth={1.8} />
              Edit Profile
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={fieldContainerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 grid min-w-0 gap-4 sm:gap-5 md:grid-cols-2"
        >
          <motion.div variants={fieldVariants}>
            <InfoField label="First Name" value={user?.firstName} />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <InfoField label="Last Name" value={user?.lastName} />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <InfoField label="Email Address" value={user?.email} />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <InfoField
              label="Phone Number"
              value={user?.phone ? `+91 ${user.phone}` : ""}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <InfoField
              label="Date of Birth"
              value={formatDateOfBirth(user?.dateOfBirth)}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <InfoField label="Gender" value={user?.gender} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* =====================================================
          SAVED ADDRESS + ACCOUNT SUMMARY
      ===================================================== */}

      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-[1fr_1fr]">
        {/* ===================================================
            SAVED ADDRESSES
        =================================================== */}

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.1,
          }}
          className="h-fit min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 md:p-7"
        >
          {/* HEADER */}

          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="font-serif text-2xl text-black">
                Saved Addresses
              </h2>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{
                  duration: 0.45,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-2 h-[2px] bg-[#b7965d]"
              />
            </div>

            <Link
              href="/profile?tab=addresses"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-50 sm:w-fit sm:py-2.5"
            >
              <span className="text-lg leading-none">+</span>
              Add New Address
            </Link>
          </div>

          {/* ADDRESS */}

          {loadingAddresses ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-5 rounded-lg border border-zinc-200 p-5 text-sm text-zinc-500 sm:mt-6 sm:p-6"
            >
              Loading saved addresses...
            </motion.div>
          ) : defaultAddress ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 min-w-0 overflow-hidden rounded-xl border border-zinc-200 p-4 sm:mt-6 sm:p-5"
            >
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row">
                {/* ICON */}

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.35,
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f4ecdf] sm:h-12 sm:w-12"
                >
                  <Home size={21} strokeWidth={1.5} />
                </motion.div>

                {/* DETAILS */}

                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-black">
                          Home
                        </h3>

                        {defaultAddress.isDefault && (
                          <span className="rounded-full bg-[#f4ecdf] px-2.5 py-1 text-[10px] font-medium text-zinc-700">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="mt-1 truncate text-sm text-zinc-700">
                        {defaultAddress.name}
                      </p>
                    </div>

                    {/* ACTIONS */}

                    <div className="flex shrink-0 items-center gap-3">
                      <Link
                        href={`/profile?tab=addresses&edit=${defaultAddress._id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-black"
                        title="Edit address"
                      >
                        <Pencil size={16} />
                      </Link>

                      <Link
                        href="/profile?tab=addresses"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition hover:bg-red-50 hover:text-red-600"
                        title="Manage addresses"
                      >
                        <Trash2 size={16} />
                      </Link>
                    </div>
                  </div>

                  <p className="mt-3 break-words text-sm leading-6 text-zinc-500">
                    {defaultAddress.address}, {defaultAddress.city},{" "}
                    {defaultAddress.state} - {defaultAddress.pincode}
                  </p>

                  {defaultAddress.country && (
                    <p className="break-words text-sm text-zinc-500">
                      {defaultAddress.country}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-zinc-500">
                    +91 {defaultAddress.phone}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.2,
              }}
              className="mt-5 rounded-xl border border-dashed border-zinc-300 p-7 text-center sm:mt-6 sm:p-8"
            >
              <MapPin
                size={28}
                className="mx-auto text-zinc-400"
                strokeWidth={1.5}
              />

              <p className="mt-3 text-sm font-medium text-black">
                No saved addresses
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Add an address for faster checkout.
              </p>

              <Link
                href="/profile?tab=addresses"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium underline underline-offset-4"
              >
                Add Address
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          )}

          {/* VIEW ALL */}

          {addresses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.45,
              }}
            >
              <Link
                href="/profile?tab=addresses"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-black underline underline-offset-4"
              >
                View all addresses
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          )}
        </motion.section>

        {/* ===================================================
            ACCOUNT SUMMARY
        =================================================== */}

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.18,
          }}
          className="h-fit min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 md:p-7"
        >
          <div className="min-w-0">
            <h2 className="font-serif text-2xl text-black">Account Summary</h2>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{
                duration: 0.45,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-2 h-[2px] bg-[#b7965d]"
            />
          </div>

          <motion.div
            variants={summaryVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 grid min-w-0 grid-cols-1 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            <SummaryCard
              icon={Package}
              value={totalOrders}
              label="Orders"
              href="/profile?tab=orders"
              linkText="View orders"
            />

            <SummaryCard
              icon={Truck}
              value={deliveredOrders}
              label="Delivered"
              href="/profile?tab=orders"
              linkText="View delivered"
            />

            <SummaryCard
              icon={Heart}
              value={wishlistCount}
              label="Wishlist"
              href="/profile?tab=wishlist"
              linkText="View wishlist"
            />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

/* =========================================================
   INFO FIELD
========================================================= */

function InfoField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-medium text-zinc-700">
        {label}
      </label>

      <div className="flex min-h-11 min-w-0 items-center overflow-hidden rounded-md border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-800 sm:px-4">
        <span className="min-w-0 break-words">{value || "Not added"}</span>
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  value,
  label,
  href,
  linkText,
}: {
  icon: typeof Package;
  value: number;
  label: string;
  href: string;
  linkText: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 18,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      whileHover={{
        y: -3,
        transition: {
          duration: 0.2,
        },
      }}
      className="min-w-0 p-4 sm:p-5"
    >
      <div className="flex min-w-0 items-center gap-3">
        {/* ICON */}

        <motion.div
          whileHover={{
            scale: 1.06,
          }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4ecdf]"
        >
          <Icon size={18} strokeWidth={1.5} />
        </motion.div>

        {/* VALUE + LABEL */}

        <div className="min-w-0">
          <p className="font-serif text-2xl leading-none text-black">{value}</p>

          <p className="mt-1 text-xs text-zinc-500">{label}</p>
        </div>
      </div>

      {/* LINK */}

      <Link
        href={href}
        className="mt-4 inline-flex max-w-full items-center gap-1 text-xs font-medium text-black underline underline-offset-4 transition hover:text-zinc-600"
      >
        <span className="truncate">{linkText}</span>

        <motion.span whileHover={{ x: 4 }} className="flex shrink-0">
          <ArrowRight size={12} />
        </motion.span>
      </Link>
    </motion.div>
  );
}
