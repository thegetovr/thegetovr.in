"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronRight, Truck, ShoppingBag } from "lucide-react";

import Pagination from "@/components/common/Pagination";

import OrderFilter, {
  type FilterOrder,
  type OrderStatus,
} from "@/components/profile/OrderFilter";

interface Order extends FilterOrder {
  date: string;
  time: string;
  items: number;
  image: string;
  payment: string;
  deliveryText: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface MyOrdersProps {
  user: UserData | null;
}

const ORDERS_PER_PAGE = 5;

export default function MyOrders({ user }: MyOrdersProps) {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<FilterOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // NORMALIZE STATUS
  // =====================================================

  const normalizeStatus = (status: unknown): OrderStatus => {
    const normalized = String(status || "").toLowerCase();

    switch (normalized) {
      case "processing":
        return "Processing";

      case "shipped":
        return "Shipped";

      case "delivered":
        return "Delivered";

      case "cancelled":
      case "canceled":
        return "Cancelled";

      default:
        return "Processing";
    }
  };

  // =====================================================
  // MAP DATABASE ORDER TO UI
  // =====================================================

  const mapOrderToUI = (order: any): Order => {
    const firstItem = order.items?.[0];

    const status = normalizeStatus(order.status);

    const createdAt = order.createdAt ? new Date(order.createdAt) : new Date();

    return {
      id: String(order.orderNumber || order._id || order.id || "ORDER"),

      date: createdAt.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      time: createdAt.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),

      items: Array.isArray(order.items) ? order.items.length : 0,

      productName: firstItem?.name || firstItem?.product || "Custom Product",

      image: firstItem?.image || "",

      price: String(order.total ?? "0"),

      payment: String(order.total ?? "0"),

      status,

      deliveryText:
        status === "Delivered"
          ? "Delivered"
          : status === "Cancelled"
            ? "Order Cancelled"
            : "Estimated delivery 3-5 Days",

      createdAt: createdAt.toISOString(),
    };
  };

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        setFilteredOrders([]);
        setOrdersLoading(false);
        return;
      }

      setOrdersLoading(true);

      try {
        /*
         * 🔐 IMPORTANT
         *
         * Do NOT send email from frontend.
         *
         * /api/orders now identifies the logged-in user
         * using the secure auth_token cookie.
         */
        const response = await fetch("/api/orders", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          console.error(result.message || "Unable to fetch orders.");

          setOrders([]);
          setFilteredOrders([]);

          return;
        }

        const mappedOrders = Array.isArray(result.orders)
          ? result.orders.map(mapOrderToUI)
          : [];

        setOrders(mappedOrders);
        setFilteredOrders(mappedOrders);
        setCurrentPage(1);
      } catch (error) {
        console.error("My Orders Error:", error);

        setOrders([]);
        setFilteredOrders([]);
        setCurrentPage(1);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // =====================================================
  // RECEIVE FILTERED ORDERS
  // =====================================================

  const handleFilteredOrdersChange = useCallback((newOrders: FilterOrder[]) => {
    setFilteredOrders(newOrders);
    setCurrentPage(1);
  }, []);

  // =====================================================
  // TOTAL PAGES
  // =====================================================

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  // =====================================================
  // CURRENT PAGE ORDERS
  // =====================================================

  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;

  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ORDERS_PER_PAGE,
  );

  // =====================================================
  // KEEP CURRENT PAGE VALID
  // =====================================================

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

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
      <section className="flex min-h-[400px] min-w-0 items-center justify-center rounded-xl border border-[#e6e0d8] bg-white px-4">
        <p className="text-sm text-zinc-500">Loading orders...</p>
      </section>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="min-w-0 flex-1 overflow-hidden rounded-xl border border-[#e6e0d8] bg-white p-4 sm:p-5 md:p-7">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-serif text-2xl text-black">My Orders</h1>

          <div className="mt-2 h-[2px] w-8 bg-[#b7965d]" />

          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
            Track and manage all your orders in one place.
          </p>
        </div>
      </div>

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <OrderFilter
        orders={orders}
        onFilteredOrdersChange={handleFilteredOrdersChange}
      />

      {/* =================================================
          ORDER LIST
      ================================================= */}

      <div className="mt-5 min-w-0 sm:mt-6">
        <div className="min-w-0 overflow-hidden rounded-xl border border-[#ddd5ca] bg-white">
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((filterOrder) => {
              const order = orders.find((item) => item.id === filterOrder.id);

              if (!order) {
                return null;
              }

              return (
                <div
                  key={order.id}
                  className="border-b border-[#e8e2da] p-3.5 last:border-b-0 sm:p-4 md:px-5 md:py-4"
                >
                  {/* =================================================
                      MOBILE LAYOUT
                  ================================================= */}

                  <div className="block md:hidden">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f8f6f2]">
                        {order.image ? (
                          <img
                            src={order.image}
                            alt={order.productName}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <ShoppingBag
                            size={24}
                            strokeWidth={1.3}
                            className="text-zinc-300"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-black">
                          {order.productName}
                        </h2>

                        <p className="mt-1 text-xs text-zinc-500">
                          {order.date}
                          {order.time ? `, ${order.time}` : ""}
                        </p>

                        <p className="mt-1 text-xs text-zinc-600">
                          {order.items} {order.items === 1 ? "Item" : "Items"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex min-w-0 flex-col gap-2">
                      <div>
                        <span
                          className={`inline-flex max-w-full items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium ${getStatusStyle(
                            order.status,
                          )}`}
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />

                          <span className="truncate">{order.status}</span>
                        </span>
                      </div>

                      <div className="flex min-w-0 items-start gap-1.5 text-xs text-zinc-500">
                        <Truck
                          size={13}
                          strokeWidth={1.7}
                          className="mt-0.5 shrink-0"
                        />

                        <span className="min-w-0 break-words">
                          {order.deliveryText}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex min-w-0 items-center justify-between gap-3 border-t border-[#eee9e2] pt-3.5">
                      <p className="shrink-0 text-sm font-semibold text-black">
                        ₹{order.price}
                      </p>

                      {order.status === "Shipped" ? (
                        <button
                          type="button"
                          className="inline-flex min-w-0 items-center justify-center gap-1 rounded-lg border border-[#d8cfc3] px-3 py-2 text-xs font-medium text-zinc-800 transition hover:bg-[#fcfaf7]"
                        >
                          <span className="truncate">Track Order</span>
                          <ChevronRight size={14} className="shrink-0" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/orders/${encodeURIComponent(order.id)}`,
                            )
                          }
                          className="inline-flex min-w-0 items-center justify-center gap-1 rounded-lg bg-[#eee3d5] px-3 py-2 text-xs font-medium text-zinc-900 transition hover:bg-[#e6d8c6]"
                        >
                          <span className="truncate">View Details</span>
                          <ChevronRight size={14} className="shrink-0" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      DESKTOP LAYOUT
                  ================================================= */}

                  <div className="hidden md:grid md:grid-cols-[92px_minmax(0,1fr)_95px_120px] md:items-center md:gap-4">
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

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-black">
                        {order.productName}
                      </h2>

                      <p className="mt-1 text-xs text-zinc-500">
                        {order.date}
                        {order.time ? `, ${order.time}` : ""}
                      </p>

                      <p className="mt-1 text-xs text-zinc-600">
                        {order.items} {order.items === 1 ? "Item" : "Items"}
                      </p>

                      <div className="mt-2 flex min-w-0 items-center gap-1.5 text-xs text-zinc-500">
                        <Truck
                          size={13}
                          strokeWidth={1.7}
                          className="shrink-0"
                        />

                        <span className="truncate">{order.deliveryText}</span>
                      </div>
                    </div>

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
                          onClick={() =>
                            router.push(
                              `/orders/${encodeURIComponent(order.id)}`,
                            )
                          }
                          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#eee3d5] px-3 py-2 text-xs font-medium text-zinc-900 transition hover:bg-[#e6d8c6]"
                        >
                          View Details
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center sm:min-h-[360px]">
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
                Try changing your search, status, year or filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          PAGINATION
      ================================================= */}

      <div className="min-w-0 overflow-x-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
