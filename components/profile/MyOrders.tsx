"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Download,
  Truck,
  ShoppingBag,
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

const tabs = [
  { label: "All Orders", value: "All" },
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface MyOrdersProps {
  user: UserData | null;
}

export default function MyOrders({ user }: MyOrdersProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // =====================================================
  // MAP DATABASE ORDER TO UI
  // =====================================================

  const mapOrderToUI = (order: any): Order => {
    const firstItem = order.items?.[0];

    return {
      id: order.orderNumber,

      date: new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      time: new Date(order.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),

      items: order.items?.length ?? 0,

      productName: firstItem?.name || firstItem?.product || "Custom Product",

      image: firstItem?.image || "",

      price: order.total,

      payment: order.total,

      status: order.status,

      deliveryText:
        order.status === "delivered"
          ? "Delivered"
          : order.status === "cancelled"
            ? "Order Cancelled"
            : "Estimated delivery 3-5 Days",
    };
  };

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("LOGGED IN USER:", user);
      console.log("LOGGED IN EMAIL:", user?.email);

      if (!user?.email) {
        setOrdersLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/orders?email=${encodeURIComponent(user.email)}`,
        );

        const result = await response.json();

        if (!result.success) {
          console.error(result.message);
          return;
        }

        console.log("Profile Orders:", result.orders);

        const mappedOrders = result.orders.map(mapOrderToUI);

        console.log("Mapped Orders:", mappedOrders);

        setOrders(mappedOrders);
      } catch (error) {
        console.error("My Orders Error:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  // =====================================================
  // FILTER ORDERS
  // =====================================================

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "All" || order.status === activeTab;

    const searchValue = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchValue) ||
      order.productName.toLowerCase().includes(searchValue) ||
      order.status.toLowerCase().includes(searchValue);

    return matchesTab && matchesSearch;
  });

  // =====================================================
  // STATUS COUNT
  // =====================================================

  const getCount = (status: string) => {
    if (status === "All") {
      return orders.length;
    }

    return orders.filter((order) => order.status === status).length;
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return "bg-[#edf7ef] text-[#4d8a5a]";

      case "Shipped":
        return "bg-[#eef4f7] text-[#587c8c]";

      case "Processing":
        return "bg-[#f7f1e5] text-[#9a7a43]";

      case "Cancelled":
        return "bg-[#fbeeee] text-[#a45c5c]";

      default:
        return "bg-[#f5f3ef] text-zinc-600";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (ordersLoading) {
    return (
      <section className="flex min-h-[400px] items-center justify-center rounded-xl border border-[#e6e0d8] bg-white">
        <p className="text-sm text-zinc-500">Loading orders...</p>
      </section>
    );
  }

  return (
    <section className="min-w-0 flex-1 rounded-xl border border-[#e6e0d8] bg-white p-6 md:p-7">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-black md:text-4xl">
            My Orders
          </h1>

          <div className="mt-2 h-[2px] w-8 bg-[#b7965d]" />

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Track and manage all your orders in one place.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#ddd5ca] bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-[#fcfaf7]"
        >
          <Download size={16} strokeWidth={1.7} />
          Download Invoices
        </button>
      </div>

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {/* SEARCH */}

        <div className="relative flex-1">
          <Search
            size={18}
            strokeWidth={1.7}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Search by Order ID, product or status..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-11 w-full rounded-lg border border-[#ddd5ca] bg-white pl-11 pr-4 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#b7965d]"
          />
        </div>

        {/* FILTER */}

        <button
          type="button"
          className="flex h-11 min-w-[125px] items-center justify-center gap-2 rounded-lg border border-[#ddd5ca] bg-white px-4 text-sm font-medium text-zinc-700 transition hover:bg-[#fcfaf7]"
        >
          <SlidersHorizontal size={16} strokeWidth={1.7} />
          Filter
          <ChevronDown size={15} />
        </button>
      </div>

      {/* =================================================
          STATUS TABS
      ================================================= */}

      <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-lg border border-[#ddd5ca] bg-white sm:grid-cols-5">
        {tabs.map((tab) => {
          const active = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center justify-center gap-2 border-b border-[#ddd5ca] px-3 py-3 text-xs font-medium transition last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 ${
                active
                  ? "bg-[#eee3d5] text-black"
                  : "text-zinc-600 hover:bg-[#fcfaf7] hover:text-black"
              }`}
            >
              {tab.label}

              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] ${
                  active
                    ? "bg-white text-zinc-700"
                    : "bg-[#f5f1eb] text-zinc-500"
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

      <div className="mt-6">
        {/* =================================================
            LEFT - ORDER LIST
        ================================================= */}

        <div className="overflow-hidden rounded-xl border border-[#ddd5ca] bg-white">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border-b border-[#e8e2da] px-4 py-4 last:border-b-0 md:px-5"
              >
                <div className="grid grid-cols-[92px_minmax(0,1fr)_95px_120px] items-center gap-4">
                  {/* PRODUCT IMAGE */}

                  <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-lg bg-[#f8f6f2]">
                    {order.image ? (
                      <img
                        src={order.image}
                        alt={order.productName}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <ShoppingBag
                        size={28}
                        strokeWidth={1.3}
                        className="text-zinc-300"
                      />
                    )}
                  </div>

                  {/* ORDER INFO */}

                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-black">
                      {order.productName}
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                      {order.date}, {order.time}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {order.items} {order.items === 1 ? "Item" : "Items"}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
                      <Truck size={13} strokeWidth={1.7} />

                      <span>{order.deliveryText}</span>
                    </div>
                  </div>

                  {/* STATUS */}

                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />

                      {order.status}
                    </span>
                  </div>

                  {/* PRICE + ACTION */}

                  <div className="flex flex-col items-end">
                    <p className="text-sm font-semibold text-black">
                      ₹{order.price}
                    </p>

                    {order.status === "Shipped" ? (
                      <button
                        type="button"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[#d8cfc3] px-3 py-2 text-xs font-medium text-zinc-800 transition hover:bg-[#fcfaf7]"
                      >
                        Track Order
                        <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => router.push(`/orders/${order.id}`)}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#eee3d5] 
                        px-3 py-2 text-xs font-medium text-zinc-900 transition hover:bg-[#e6d8c6]"
                      >
                        View Details
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* EMPTY STATE */

            <div className="flex min-h-[360px] flex-col items-center justify-center px-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f1eb]">
                <ShoppingBag
                  size={26}
                  strokeWidth={1.4}
                  className="text-zinc-400"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-black">
                No orders found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-zinc-500">
                Try changing your search or selected filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          PAGINATION
      ================================================= */}

      <div className="mt-6 flex items-center justify-center gap-1.5">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-[#f5f1eb] hover:text-black"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eee3d5] text-xs font-medium text-black"
        >
          1
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md text-xs text-zinc-600 transition hover:bg-[#f5f1eb]"
        >
          2
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md text-xs text-zinc-600 transition hover:bg-[#f5f1eb]"
        >
          3
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-[#f5f1eb] hover:text-black"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
