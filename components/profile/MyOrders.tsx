"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
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
         * /api/orders identifies the logged-in user
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
  // PAGE
  // =====================================================

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-w-0 flex-1 overflow-hidden rounded-xl border border-[#e6e0d8] bg-white p-4 sm:p-5 md:min-h-[650px] md:p-7"
    >
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
          <AnimatePresence mode="wait" initial={false}>
            {ordersLoading ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center px-4 py-10">
                <div
                  className="h-7 w-7 animate-spin rounded-full border-2 border-[#e7dfd4] border-t-[#b7965d]"
                  aria-label="Loading orders"
                  role="status"
                />

                <div className="mt-6 w-full max-w-3xl space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="animate-pulse rounded-xl border border-[#eee9e2] bg-white p-3 sm:p-4 md:px-5 md:py-4"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="h-[72px] w-[72px] shrink-0 rounded-lg bg-[#f3f0eb] md:h-[88px] md:w-[88px]" />

                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="h-3.5 w-2/3 rounded bg-[#eee9e2]" />
                          <div className="h-2.5 w-1/3 rounded bg-[#f2eee8]" />
                          <div className="h-2.5 w-1/4 rounded bg-[#f2eee8]" />

                          <div className="hidden h-2.5 w-1/2 rounded bg-[#f2eee8] md:block" />
                        </div>

                        <div className="hidden w-[95px] md:block">
                          <div className="h-6 w-16 rounded-md bg-[#f3f0eb]" />
                        </div>

                        <div className="hidden w-[120px] space-y-3 md:flex md:flex-col md:items-end">
                          <div className="h-3.5 w-14 rounded bg-[#eee9e2]" />
                          <div className="h-8 w-24 rounded-lg bg-[#f3eee7]" />
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2 md:hidden">
                        <div className="h-6 w-20 rounded-md bg-[#f3f0eb]" />
                        <div className="h-6 w-32 rounded-md bg-[#f3f0eb]" />
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-[#eee9e2] pt-3 md:hidden">
                        <div className="h-3.5 w-14 rounded bg-[#eee9e2]" />
                        <div className="h-8 w-24 rounded-lg bg-[#f3eee7]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : paginatedOrders.length > 0 ? (
              <motion.div
                key={`orders-${currentPage}-${paginatedOrders.map((order) => order.id).join("-")}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {paginatedOrders.map((filterOrder, index) => {
                  const order = orders.find(
                    (item) => item.id === filterOrder.id,
                  );

                  if (!order) {
                    return null;
                  }

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-b border-[#e8e2da] p-3 last:border-b-0 sm:p-4 md:px-5 md:py-4"
                    >
                      {/* =================================================
                      MOBILE LAYOUT
                  ================================================= */}

                      <div className="block md:hidden">
                        {/* PRODUCT TOP */}

                        <div className="flex min-w-0 items-start gap-3">
                          {/* IMAGE */}

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

                          {/* INFO */}

                          <div className="min-w-0 flex-1">
                            <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-black">
                              {order.productName}
                            </h2>

                            <p className="mt-1 text-xs text-zinc-500">
                              {order.date}
                              {order.time ? `, ${order.time}` : ""}
                            </p>

                            <p className="mt-1 text-xs text-zinc-600">
                              {order.items}{" "}
                              {order.items === 1 ? "Item" : "Items"}
                            </p>
                          </div>
                        </div>

                        {/* STATUS + DELIVERY */}

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

                        {/* PRICE + ACTION */}

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

                            <span className="truncate">
                              {order.deliveryText}
                            </span>
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
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* =================================================
               EMPTY STATE
            ================================================= */

              <motion.div
                key="no-orders"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center sm:min-h-[360px]"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f1eb]"
                >
                  <ShoppingBag
                    size={26}
                    strokeWidth={1.4}
                    className="text-zinc-400"
                  />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.14 }}
                  className="mt-4 text-base font-semibold text-black"
                >
                  No orders found
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-1 max-w-sm text-sm text-zinc-500"
                >
                  Try changing your search, status, year or filter.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =================================================
          REUSABLE PAGINATION
      ================================================= */}

      <div className="min-w-0 overflow-x-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </motion.section>
  );
}
