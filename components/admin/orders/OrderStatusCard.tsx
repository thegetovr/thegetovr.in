"use client";

import { useEffect, useState, useTransition } from "react";

import { updateOrderStatusAction } from "@/app/admin/orders/actions";
import { ORDER_STATUSES } from "@/constants/orderStatuses";

import type { OrderStatus } from "@/types/order";

type OrderStatusCardProps = {
  orderNumber: string;
  currentStatus: OrderStatus;
};

export default function OrderStatusCard({
  orderNumber,
  currentStatus,
}: OrderStatusCardProps) {
  const [status, setStatus] =
    useState<OrderStatus>(currentStatus);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const hasChanges = status !== currentStatus;

  function handleUpdate() {
    startTransition(async () => {
      try {
        await updateOrderStatusAction(
          orderNumber,
          status,
        );

        setMessage({
          type: "success",
          text: "Order status updated successfully.",
        });
      } catch (error) {
  console.error(error);

  setMessage({
    type: "error",
    text: "Failed to update order status.",
  });
}
    });
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Order Status
      </h2>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm text-zinc-400"
          >
            Current Status
          </label>

          <select
            id="status"
            value={status}
            disabled={isPending}
            onChange={(e) =>
              setStatus(
                e.target.value as OrderStatus,
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none disabled:opacity-60"
          >
            {ORDER_STATUSES.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          disabled={!hasChanges || isPending}
          onClick={handleUpdate}
          className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isPending
            ? "Updating..."
            : "Update Status"}
        </button>

        {message && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              message.type === "success"
                ? "border-green-700 bg-green-500/10 text-green-400"
                : "border-red-700 bg-red-500/10 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
          <p className="text-xs text-zinc-500">
            Order Number
          </p>

          <p className="mt-1 break-all text-sm text-zinc-300">
            {orderNumber}
          </p>
        </div>
      </div>
    </section>
  );
}