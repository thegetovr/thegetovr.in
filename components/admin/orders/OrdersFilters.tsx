"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { ORDER_STATUSES } from "@/constants/orderStatuses";

import type { OrderStatus } from "@/types/order";

type OrdersFiltersProps = {
  search?: string;
  status?: OrderStatus;
};

export default function OrdersFilters({
  search = "",
  status,
}: OrdersFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const hasFilters =
  search.trim().length > 0 || Boolean(status);

  function submit(formData: FormData) {
    const params = new URLSearchParams(searchParams.toString());

    const searchValue = String(formData.get("search") ?? "").trim();
    const statusValue = String(formData.get("status") ?? "").trim();

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    if (statusValue) {
      params.set("status", statusValue);
    } else {
      params.delete("status");
    }

    startTransition(() => {
      const query = params.toString();
      router.push(query ? `/admin/orders?${query}` : "/admin/orders");
    });
  }

  return (
  <form
    action={submit}
    className="mb-6 flex flex-wrap items-center gap-3"
  >
    <div className="flex min-w-105 flex-1 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 focus-within:border-white">
      <input
        name="search"
        type="search"
        defaultValue={search}
        autoComplete="off"
        placeholder="Search orders, customers or email..."
        className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
      />

      <button
        type="submit"
        disabled={isPending}
        className="border-l border-zinc-700 bg-zinc-800 px-5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Searching..." : "Search"}
      </button>
    </div>

    <select
      name="status"
      defaultValue={status ?? ""}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
      disabled={isPending}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none lg:w-48"
    >
      <option value="">All Statuses</option>

      {ORDER_STATUSES.map((item) => (
        <option
          key={item.value}
          value={item.value}
        >
          {item.label}
        </option>
      ))}
    </select>

    {hasFilters && (
      <button
        type="button"
        onClick={() =>
          startTransition(() => {
            router.push("/admin/orders");
          })
        }
        className="rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-white transition hover:bg-zinc-800"
      >
       Reset
      </button>
    )}
  </form>
);
}