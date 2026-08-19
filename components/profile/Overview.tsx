"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Heart,
  Box,
  Package,
  MapPin,
  CreditCard,
  CircleHelp,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Headphones,
  ArrowRight,
} from "lucide-react";
import image from "next/image";
import { useEffect, useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface OverviewProps {
  user: UserData | null;
}

/* =========================================================
   QUICK ACTIONS
========================================================= */

const quickActions = [
  {
    title: "Update Profile",
    description: "Edit your personal details",
    icon: Package,
    href: "#",
  },
  {
    title: "Manage Addresses",
    description: "Add or edit delivery addresses",
    icon: MapPin,
    href: "#",
  },
  {
    title: "Payment Methods",
    description: "Manage your saved cards & UPI",
    icon: CreditCard,
    href: "#",
  },
  {
    title: "Help & Support",
    description: "View FAQs or contact support",
    icon: CircleHelp,
    href: "/contact",
  },
];

/* =========================================================
   BENEFITS
========================================================= */

const benefits = [
  {
    title: "Free Shipping",
    description: "On all orders above ₹999",
    icon: Truck,
  },
  {
    title: "Secure Payments",
    description: "100% secure & trusted",
    icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns",
    icon: RefreshCcw,
  },
  {
    title: "Support 24/7",
    description: "We're here to help",
    icon: Headphones,
  },
];

export default function Overview({ user }: OverviewProps) {
  const [stats, setStats] = useState({
    totalOrders: 0,
    processingOrders: 0,
    deliveredOrders: 0,
    wishlistItems: 0,
  });

  useEffect(() => {
    const fetchOrderStats = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `/api/orders?email=${encodeURIComponent(user.email)}`,
        );

        const result = await response.json();

        if (!result.success) {
          console.error(result.message);
          return;
        }

        const orders = result.orders || [];

        const processingOrders = orders.filter(
          (order: { status: string }) => order.status === "processing",
        ).length;

        const deliveredOrders = orders.filter(
          (order: { status: string }) => order.status === "delivered",
        ).length;

        setStats((currentStats) => ({
          ...currentStats,
          totalOrders: orders.length,
          processingOrders,
          deliveredOrders,
        }));
      } catch (error) {
        console.error("Overview Orders Error:", error);
      }
    };

    fetchOrderStats();
  }, [user?.email]);

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      action: "View all orders",
      href: "#",
    },
    {
      title: "Processing",
      value: stats.processingOrders,
      icon: Clock3,
      action: "View details",
      href: "#",
    },
    {
      title: "Delivered",
      value: stats.deliveredOrders,
      icon: CheckCircle2,
      action: "View details",
      href: "#",
    },
    {
      title: "Wishlist",
      value: stats.wishlistItems,
      icon: Heart,
      action: "View wishlist",
      href: "#",
    },
  ];
  /* =======================================================
     GREETING
  ======================================================= */

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 17) {
      return "Good Afternoon";
    }

    return "Good Evening";
  };

  return (
    <section className="min-w-0 flex-1 overflow-hidden bg-white px-8 py-7">
      {/* =====================================================
          HEADER / GREETING
      ===================================================== */}

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          {getGreeting()}, {user?.firstName || "User"} 👋
        </h1>

        <p className="mt-1.5 text-sm text-gray-500">
          Manage your orders and account details from here.
        </p>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="mt-6 grid grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
                <Icon size={20} strokeWidth={1.8} className="text-black" />
              </div>

              {/* Title */}
              <p className="mt-3 text-sm font-medium text-gray-500">
                {card.title}
              </p>

              {/* Value */}
              <h2 className="mt-0.5 text-2xl font-semibold text-black">
                {card.value}
              </h2>

              {/* Action */}
              <Link
                href={card.href}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-black transition hover:gap-2"
              >
                {card.action}
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          RECENT ORDERS + QUICK ACTIONS
      ===================================================== */}

      <div className="mt-5 grid grid-cols-[1.45fr_1fr] gap-5">
        {/* ===================================================
            RECENT ORDERS
        =================================================== */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <h2 className="text-base font-semibold text-black">
              Recent Orders
            </h2>

            <Link
              href="/profile"
              className="flex items-center gap-1 text-xs font-medium text-gray-600 transition hover:text-black"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Empty State */}
          <div className="flex min-h-[245px] flex-col items-center justify-center px-5 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
              <Box size={36} strokeWidth={1.5} className="text-gray-400" />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-black">
              No orders yet
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Your recent orders will appear here.
            </p>

            <Link
              href="/shop"
              className="mt-4 rounded-lg bg-black px-5 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
            >
              Start Shopping
            </Link>
          </div>
        </div>

        {/* ===================================================
            QUICK ACTIONS
        =================================================== */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-base font-semibold text-black">
              Quick Actions
            </h2>
          </div>

          <div className="px-5">
            {quickActions.map((action, index) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`group flex items-center gap-3 py-3.5 ${
                    index !== quickActions.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                    <Icon size={18} strokeWidth={1.8} className="text-black" />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-black">
                      {action.title}
                    </h3>

                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {action.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={17}
                    className="shrink-0 text-black transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          NEW ARRIVALS BANNER
      ===================================================== */}

      <div className="relative mt-5 h-[200px] overflow-hidden rounded-xl bg-black">
        {/* Banner Image */}

        <img
          src="/images/arrival_banner.png"
          alt="GETOVR New Arrivals"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center px-7">
          <h2 className="text-xl font-semibold text-white">
            New Arrivals Just Dropped!
          </h2>

          <p className="mt-1 text-xs text-gray-300">
            Explore the latest styles and exclusive collections.
          </p>

          <Link
            href="/shop"
            className="mt-4 flex w-fit items-center gap-2 rounded-md bg-white px-4 py-3 text-xs font-semibold text-black transition hover:bg-gray-200"
          >
            Shop Now
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <div className="mt-5 grid grid-cols-4 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="flex items-center gap-3 px-5 py-4"
            >
              <Icon
                size={27}
                strokeWidth={1.6}
                className="shrink-0 text-black"
              />

              <div>
                <h3 className="text-xs font-semibold text-black">
                  {benefit.title}
                </h3>

                <p className="mt-0.5 text-[11px] text-gray-500">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
