"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";

import SearchFilter from "@/components/common/SearchFilter";
import { fuzzySearch } from "@/lib/utils/fuzzySearch";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type SortOption = "newest" | "oldest" | "price-high" | "price-low";

export type YearFilter =
  | "all"
  | "this-year"
  | "previous-year"
  | "last-5-years"
  | string;

export interface FilterOrder {
  id: string;
  productName: string;
  price: string;
  status: OrderStatus;
  createdAt: string;
}

interface OrderFilterProps {
  orders: FilterOrder[];
  onFilteredOrdersChange: (orders: FilterOrder[]) => void;
}

// =========================================================
// STATUS TABS
// =========================================================

const tabs = [
  {
    label: "All Orders",
    value: "All",
  },
  {
    label: "Processing",
    value: "Processing",
  },
  {
    label: "Shipped",
    value: "Shipped",
  },
  {
    label: "Delivered",
    value: "Delivered",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
];

export default function OrderFilter({
  orders,
  onFilteredOrdersChange,
}: OrderFilterProps) {
  const filterRef = useRef<HTMLDivElement>(null);

  // =======================================================
  // SEARCH
  // =======================================================

  const [search, setSearch] = useState("");

  // =======================================================
  // STATUS
  // =======================================================

  const [activeTab, setActiveTab] = useState("All");

  // =======================================================
  // FILTER DROPDOWN
  // =======================================================

  const [filterOpen, setFilterOpen] = useState(false);

  // =======================================================
  // APPLIED FILTERS
  // =======================================================

  const [appliedSort, setAppliedSort] = useState<SortOption>("newest");

  const [appliedYear, setAppliedYear] = useState<YearFilter>("all");

  // =======================================================
  // DRAFT FILTERS
  // These DO NOT affect orders until Apply Filters
  // =======================================================

  const [draftSort, setDraftSort] = useState<SortOption>("newest");

  const [draftYear, setDraftYear] = useState<YearFilter>("all");

  // =======================================================
  // CURRENT YEAR
  // =======================================================

  const currentYear = new Date().getFullYear();

  const lastFiveYears = Array.from(
    { length: 5 },
    (_, index) => currentYear - index,
  );

  // =======================================================
  // FUZZY SEARCH
  // =======================================================

  const searchedOrders = useMemo(() => {
    return fuzzySearch(orders, search, ["id", "productName", "status"]);
  }, [orders, search]);

  // =======================================================
  // FILTER + SORT
  // =======================================================

  const filteredOrders = useMemo(() => {
    return [...searchedOrders]
      .filter((order) => {
        // -------------------------------------------------
        // STATUS
        // -------------------------------------------------

        const matchesTab = activeTab === "All" || order.status === activeTab;

        // -------------------------------------------------
        // YEAR
        // -------------------------------------------------

        const orderYear = new Date(order.createdAt).getFullYear();

        let matchesYear = true;

        if (appliedYear === "this-year") {
          matchesYear = orderYear === currentYear;
        } else if (appliedYear === "previous-year") {
          matchesYear = orderYear === currentYear - 1;
        } else if (appliedYear === "last-5-years") {
          matchesYear =
            orderYear >= currentYear - 4 && orderYear <= currentYear;
        } else if (appliedYear !== "all") {
          matchesYear = orderYear === Number(appliedYear);
        }

        return matchesTab && matchesYear;
      })
      .sort((a, b) => {
        // -------------------------------------------------
        // NEWEST
        // -------------------------------------------------

        if (appliedSort === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        // -------------------------------------------------
        // OLDEST
        // -------------------------------------------------

        if (appliedSort === "oldest") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }

        // -------------------------------------------------
        // PRICE HIGH TO LOW
        // -------------------------------------------------

        if (appliedSort === "price-high") {
          return Number(b.price) - Number(a.price);
        }

        // -------------------------------------------------
        // PRICE LOW TO HIGH
        // -------------------------------------------------

        if (appliedSort === "price-low") {
          return Number(a.price) - Number(b.price);
        }

        return 0;
      });
  }, [searchedOrders, activeTab, appliedSort, appliedYear, currentYear]);

  // =======================================================
  // SEND RESULTS TO MY ORDERS
  // =======================================================

  useEffect(() => {
    onFilteredOrdersChange(filteredOrders);
  }, [filteredOrders, onFilteredOrdersChange]);

  // =======================================================
  // OPEN FILTER
  // =======================================================

  const handleOpenFilter = () => {
    setDraftSort(appliedSort);
    setDraftYear(appliedYear);

    setFilterOpen((open) => !open);
  };

  // =======================================================
  // APPLY FILTERS
  // =======================================================

  const handleApplyFilters = () => {
    setAppliedSort(draftSort);
    setAppliedYear(draftYear);

    setFilterOpen(false);
  };

  // =======================================================
  // RESET FILTERS
  // =======================================================

  const handleResetFilters = () => {
    setDraftSort("newest");
    setDraftYear("all");

    setAppliedSort("newest");
    setAppliedYear("all");
  };

  // =======================================================
  // CLOSE WITHOUT APPLYING
  // =======================================================

  const handleCloseFilter = () => {
    setDraftSort(appliedSort);
    setDraftYear(appliedYear);

    setFilterOpen(false);
  };

  // =======================================================
  // OUTSIDE CLICK
  // =======================================================

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        handleCloseFilter();
      }
    };

    if (filterOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [filterOpen, appliedSort, appliedYear]);

  // =======================================================
  // ACTIVE FILTER
  // =======================================================

  const hasActiveFilter = appliedSort !== "newest" || appliedYear !== "all";

  // =======================================================
  // STATUS COUNT
  // =======================================================

  const getCount = (status: string) => {
    if (status === "All") {
      return orders.length;
    }

    return orders.filter((order) => order.status === status).length;
  };

  // =======================================================
  // UI
  // =======================================================

  return (
    <>
      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {/* REUSABLE SEARCH */}

        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Search by Order ID, product or status..."
        />

        {/* FILTER */}

        <div ref={filterRef} className="relative">
          <button
            type="button"
            onClick={handleOpenFilter}
            className={`flex h-11 min-w-[125px] items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${
              filterOpen || hasActiveFilter
                ? "border-[#cdbb9f] bg-[#fcfaf7] text-black"
                : "border-[#ddd5ca] bg-white text-zinc-700 hover:bg-[#fcfaf7]"
            }`}
          >
            <SlidersHorizontal size={16} strokeWidth={1.7} />

            <span>Filter</span>

            {hasActiveFilter && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#eee3d5] px-1 text-[9px] text-zinc-700">
                1
              </span>
            )}

            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${
                filterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* =================================================
              FILTER DROPDOWN
              OPENS UPWARD
          ================================================= */}

          {filterOpen && (
            <div className="absolute bottom-12 right-0 z-50 w-[min(760px,calc(100vw-32px))] overflow-hidden rounded-xl border border-[#ddd5ca] bg-white shadow-xl">
              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-[#e8e2da] px-5 py-3.5">
                <div>
                  <h3 className="text-sm font-semibold text-black">
                    Filter Orders
                  </h3>

                  <p className="mt-0.5 text-[10px] text-zinc-400">
                    Select filters and apply them
                  </p>
                </div>

                {(draftSort !== appliedSort || draftYear !== appliedYear) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[10px] font-medium text-zinc-500 underline underline-offset-2 transition hover:text-black"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* =================================================
                  SORT + YEAR
              ================================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* SORT */}

                <div className="border-b border-[#e8e2da] p-5 md:border-b-0 md:border-r">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    Sort By
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <FilterOption
                      label="Newest First"
                      active={draftSort === "newest"}
                      onClick={() => setDraftSort("newest")}
                    />

                    <FilterOption
                      label="Oldest First"
                      active={draftSort === "oldest"}
                      onClick={() => setDraftSort("oldest")}
                    />

                    <FilterOption
                      label="Price: High to Low"
                      active={draftSort === "price-high"}
                      onClick={() => setDraftSort("price-high")}
                    />

                    <FilterOption
                      label="Price: Low to High"
                      active={draftSort === "price-low"}
                      onClick={() => setDraftSort("price-low")}
                    />
                  </div>
                </div>

                {/* YEAR */}

                <div className="p-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    Order Year
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <FilterOption
                      label="All Years"
                      active={draftYear === "all"}
                      onClick={() => setDraftYear("all")}
                    />

                    <FilterOption
                      label={`This Year (${currentYear})`}
                      active={draftYear === "this-year"}
                      onClick={() => setDraftYear("this-year")}
                    />

                    <FilterOption
                      label={`Previous Year (${currentYear - 1})`}
                      active={draftYear === "previous-year"}
                      onClick={() => setDraftYear("previous-year")}
                    />

                    <FilterOption
                      label="Last 5 Years"
                      active={draftYear === "last-5-years"}
                      onClick={() => setDraftYear("last-5-years")}
                    />

                    {lastFiveYears.map((year) => (
                      <FilterOption
                        key={year}
                        label={String(year)}
                        active={draftYear === String(year)}
                        onClick={() => setDraftYear(String(year))}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="flex items-center justify-between border-t border-[#e8e2da] bg-[#fcfaf7] px-5 py-3">
                <button
                  type="button"
                  onClick={handleCloseFilter}
                  className="text-xs font-medium text-zinc-500 transition hover:text-black"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="rounded-lg bg-[#eee3d5] px-5 py-2.5 text-xs font-medium text-black transition hover:bg-[#e6d8c6]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
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
    </>
  );
}

/* =========================================================
   FILTER OPTION
========================================================= */

function FilterOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition ${
        active
          ? "border-[#cdbb9f] bg-[#eee3d5] text-black"
          : "border-[#e4ddd4] bg-white text-zinc-600 hover:bg-[#fcfaf7] hover:text-black"
      }`}
    >
      <span>{label}</span>

      {active && <Check size={13} strokeWidth={2} />}
    </button>
  );
}
