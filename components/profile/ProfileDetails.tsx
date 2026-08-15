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

  return (
    <div className="space-y-5">
      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

      <section className="rounded-xl border border-zinc-200 bg-white p-6 md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-black">
              Personal Information
            </h2>

            <div className="mt-2 h-[2px] w-8 bg-[#b7965d]" />
          </div>

          <Link
            href="/profile?tab=profile&edit=true"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-50"
          >
            <Pencil size={15} strokeWidth={1.8} />
            Edit Profile
          </Link>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <InfoField label="First Name" value={user?.firstName} />

          <InfoField label="Last Name" value={user?.lastName} />

          <InfoField label="Email Address" value={user?.email} />

          <InfoField
            label="Phone Number"
            value={user?.phone ? `+91 ${user.phone}` : ""}
          />

          <InfoField label="Date of Birth" value={user?.dateOfBirth} />

          <InfoField label="Gender" value={user?.gender} />
        </div>
      </section>

      {/* =====================================================
          SAVED ADDRESS + ACCOUNT SUMMARY
      ===================================================== */}

      <div className="grid items-start gap-5 xl:grid-cols-[1.35fr_1fr]">
        {/* ===================================================
            SAVED ADDRESSES
        =================================================== */}

        <section className="h-fit rounded-xl border border-zinc-200 bg-white p-6 md:p-7">
          {/* HEADER */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-black">
                Saved Addresses
              </h2>

              <div className="mt-2 h-[2px] w-8 bg-[#b7965d]" />
            </div>

            <Link
              href="/profile?tab=addresses"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-50"
            >
              <span className="text-lg leading-none">+</span>
              Add New Address
            </Link>
          </div>

          {/* ADDRESS */}

          {loadingAddresses ? (
            <div className="mt-6 rounded-lg border border-zinc-200 p-6 text-sm text-zinc-500">
              Loading saved addresses...
            </div>
          ) : defaultAddress ? (
            <div className="mt-6 rounded-xl border border-zinc-200 p-5">
              <div className="flex gap-4">
                {/* ICON */}

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f4ecdf]">
                  <Home size={21} strokeWidth={1.5} />
                </div>

                {/* DETAILS */}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
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

                      <p className="mt-1 text-sm text-zinc-700">
                        {defaultAddress.name}
                      </p>
                    </div>

                    {/* ACTIONS */}

                    <div className="flex shrink-0 items-center gap-3">
                      <Link
                        href={`/profile?tab=addresses&edit=${defaultAddress._id}`}
                        className="text-zinc-600 transition hover:text-black"
                        title="Edit address"
                      >
                        <Pencil size={16} />
                      </Link>

                      <Link
                        href="/profile?tab=addresses"
                        className="text-zinc-600 transition hover:text-red-600"
                        title="Manage addresses"
                      >
                        <Trash2 size={16} />
                      </Link>
                    </div>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {defaultAddress.address}, {defaultAddress.city},{" "}
                    {defaultAddress.state} - {defaultAddress.pincode}
                  </p>

                  {defaultAddress.country && (
                    <p className="text-sm text-zinc-500">
                      {defaultAddress.country}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-zinc-500">
                    +91 {defaultAddress.phone}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-zinc-300 p-8 text-center">
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
            </div>
          )}

          {/* VIEW ALL */}

          {addresses.length > 0 && (
            <Link
              href="/profile?tab=addresses"
              className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-black underline underline-offset-4"
            >
              View all addresses
              <ArrowRight size={13} />
            </Link>
          )}
        </section>

        {/* ===================================================
            ACCOUNT SUMMARY
        =================================================== */}

        <section className="h-fit rounded-xl border border-zinc-200 bg-white p-6 md:p-7">
          <div>
            <h2 className="font-serif text-2xl text-black">Account Summary</h2>

            <div className="mt-2 h-[2px] w-8 bg-[#b7965d]" />
          </div>

          <div className="mt-7 space-y-4">
            {/* ORDERS */}

            <SummaryCard
              icon={Package}
              value={totalOrders}
              label="Orders"
              href="/profile?tab=orders"
              linkText="View orders"
            />

            {/* DELIVERED */}

            <SummaryCard
              icon={Truck}
              value={deliveredOrders}
              label="Delivered"
              href="/profile?tab=orders"
              linkText="View delivered"
            />

            {/* WISHLIST */}

            <SummaryCard
              icon={Heart}
              value={wishlistCount}
              label="Wishlist"
              href="/profile?tab=wishlist"
              linkText="View wishlist"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   INFO FIELD
========================================================= */

function InfoField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-zinc-700">
        {label}
      </label>

      <div className="flex min-h-11 items-center rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800">
        {value || "Not added"}
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
    <div className="rounded-xl border border-zinc-200 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f4ecdf]">
            <Icon size={20} strokeWidth={1.5} />
          </div>

          <div>
            <p className="font-serif text-3xl leading-none text-black">
              {value}
            </p>

            <p className="mt-1 text-xs text-zinc-500">{label}</p>
          </div>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-black underline underline-offset-4"
        >
          {linkText}
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
