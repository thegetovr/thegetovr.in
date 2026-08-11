"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Download,
  CalendarDays,
  Truck,
  CircleHelp,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

interface Order {
  id: string;
  date: string;
  time: string;
  items: number;
  productName: string;
  image: string;
  price: string;
  payment: string;
  status: OrderStatus;
  deliveryText: string;
}

const orders: Order[] = [
  {
    id: "#TG1024",
    date: "11 Aug 2026",
    time: "10:30 AM",
    items: 1,
    productName: "Oversized Black T-Shirt",
    image: "/images/products/black-tshirt.png",
    price: "₹1,999",
    payment: "Paid Online",
    status: "Delivered",
    deliveryText: "Delivered on 14 Aug 2026",
  },
  {
    id: "#TG1023",
    date: "08 Aug 2026",
    time: "07:15 PM",
    items: 1,
    productName: "Minimal Hoodie - Grey",
    image: "/images/products/grey-hoodie.png",
    price: "₹2,499",
    payment: "Paid Online",
    status: "Shipped",
    deliveryText: "Expected delivery 12 Aug 2026",
  },
  {
    id: "#TG1022",
    date: "02 Aug 2026",
    time: "11:05 AM",
    items: 1,
    productName: "GETOVR Classic Cap",
    image: "/images/products/black-cap.png",
    price: "₹999",
    payment: "Paid Online",
    status: "Processing",
    deliveryText: "Expected delivery 06 Aug 2026",
  },
  {
    id: "#TG1021",
    date: "31 Jul 2026",
    time: "09:20 PM",
    items: 2,
    productName: "GETOVR Cargo Pants",
    image: "/images/products/cargo-pants.png",
    price: "₹3,198",
    payment: "Refunded",
    status: "Cancelled",
    deliveryText: "Cancelled on 01 Aug 2026",
  },
];

const tabs = [
  { label: "All Orders", value: "All" },
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  /* =====================================================
     FILTER ORDERS
  ===================================================== */

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "All" || order.status === activeTab;

    const searchValue = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchValue) ||
      order.productName.toLowerCase().includes(searchValue) ||
      order.status.toLowerCase().includes(searchValue);

    return matchesTab && matchesSearch;
  });

  /* =====================================================
     STATUS COUNT
  ===================================================== */

  const getCount = (status: string) => {
    if (status === "All") {
      return orders.length;
    }

    return orders.filter((order) => order.status === status).length;
  };

  /* =====================================================
     STATUS STYLE
  ===================================================== */

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700";

      case "Shipped":
        return "bg-blue-50 text-blue-700";

      case "Processing":
        return "bg-yellow-50 text-yellow-700";

      case "Cancelled":
        return "bg-red-50 text-red-700";

      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <section className="min-w-0 flex-1 bg-white px-8 py-7">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black">
            My Orders
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Track and manage all your orders in one place.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-gray-50"
        >
          <Download size={17} strokeWidth={1.8} />
          Download Invoices
        </button>
      </div>

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <div className="mt-7 flex gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={19}
            strokeWidth={1.8}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by Order ID, product or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
          />
        </div>

        {/* Filter */}
        <button
          type="button"
          className="flex h-12 min-w-[145px] items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-black transition hover:bg-gray-50"
        >
          <SlidersHorizontal size={18} strokeWidth={1.8} />
          Filter
          <ChevronDown size={16} />
        </button>
      </div>

      {/* =================================================
          STATUS TABS
      ================================================= */}

      <div className="mt-5 flex overflow-hidden rounded-lg border border-gray-200 bg-white">
        {tabs.map((tab) => {
          const active = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex flex-1 items-center justify-center gap-2 border-r border-gray-200 px-4 py-3 text-sm font-medium transition last:border-r-0 ${
                active
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              {tab.label}

              <span
                className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs ${
                  active
                    ? "bg-white/15 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {getCount(tab.value)}
              </span>
            </button>
          );
        })}
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_300px] gap-5">
        {/* =================================================
            LEFT - ORDER LIST
        ================================================= */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border-b border-gray-200 px-5 py-5 last:border-b-0"
              >
                <div className="grid grid-cols-[150px_minmax(0,1fr)_130px_160px] items-center gap-5">
                  {/* Product Image */}
                  <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Order Info */}
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-black">
                      Order {order.id}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.date}, {order.time}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      {order.items} {order.items === 1 ? "Item" : "Items"}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                      <Truck size={16} strokeWidth={1.7} />
                      <span>{order.deliveryText}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                      {order.status}
                    </span>
                  </div>

                  {/* Price + Action */}
                  <div className="flex flex-col items-end">
                    <p className="text-lg font-semibold text-black">
                      {order.price}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {order.payment}
                    </p>

                    {order.status === "Shipped" ? (
                      <button
                        type="button"
                        className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-50"
                      >
                        Track Order
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="mt-4 flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                      >
                        View Details
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty Search / Filter State */
            <div className="flex min-h-[400px] flex-col items-center justify-center px-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                <ShoppingBag
                  size={30}
                  strokeWidth={1.5}
                  className="text-gray-400"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-black">
                No orders found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or selected filter.
              </p>
            </div>
          )}
        </div>

        {/* =================================================
            RIGHT SIDEBAR
        ================================================= */}

        <div className="space-y-5">
          {/* Order Summary */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-base font-semibold text-black">
              Order Summary
            </h2>

            <div className="mt-5 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CalendarDays size={17} />
                  Total Orders
                </div>

                <span className="text-sm font-medium text-black">
                  {orders.length}
                </span>
              </div>

              {/* Processing */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-yellow-400" />
                  Processing
                </div>

                <span className="text-sm font-medium text-black">
                  {getCount("Processing")}
                </span>
              </div>

              {/* Shipped */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck size={17} className="text-blue-600" />
                  Shipped
                </div>

                <span className="text-sm font-medium text-black">
                  {getCount("Shipped")}
                </span>
              </div>

              {/* Delivered */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={17} className="text-green-600" />
                  Delivered
                </div>

                <span className="text-sm font-medium text-black">
                  {getCount("Delivered")}
                </span>
              </div>

              {/* Cancelled */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <XCircle size={17} className="text-red-600" />
                  Cancelled
                </div>

                <span className="text-sm font-medium text-black">
                  {getCount("Cancelled")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("All")}
              className="mt-6 w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              View All Orders
            </button>
          </div>

          {/* Need Help */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-base font-semibold text-black">Need Help?</h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Check our help center or contact our support team.
            </p>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-gray-50"
            >
              <CircleHelp size={17} />
              Visit Help Center
              <ExternalLink size={14} />
            </Link>
          </div>

          {/* GETOVR Promotion */}
          <div className="relative min-h-[185px] overflow-hidden rounded-xl border border-gray-200 bg-white p-5">
            <div className="relative z-10 max-w-[170px]">
              <h2 className="text-base font-semibold text-black">
                Explore GETOVR Collection
              </h2>

              <p className="mt-2 text-sm leading-5 text-gray-500">
                Check out our latest arrivals and exclusive offers.
              </p>

              <Link
                href="/shop"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-50"
              >
                Shop Now
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="absolute bottom-0 right-0 h-[150px] w-[130px]">
              <img
                src="/images/getovr-model.png"
                alt="GETOVR Collection"
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          PAGINATION
      ================================================= */}

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-black"
        >
          <ChevronLeft size={17} />
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md bg-black text-sm font-medium text-white"
        >
          1
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-sm text-gray-600 transition hover:bg-gray-100"
        >
          2
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-sm text-gray-600 transition hover:bg-gray-100"
        >
          3
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-black"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </section>
  );
}
