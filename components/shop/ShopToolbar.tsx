"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types/category";

interface ShopToolbarProps {
  search: string;
  category: string;
  sort: "latest" | "price-low" | "price-high";
  categories: Category[];
}

export default function ShopToolbar({
  search,
  category,
  sort,
  categories,
}: ShopToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(search);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();

    router.push(query ? `/shop?${query}` : "/shop");
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateParam("search", searchValue.trim());
  }

  function clearSearch() {
    setSearchValue("");
    updateParam("search", "");
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full lg:max-w-xl"
      >
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
        />

        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          type="search"
          placeholder="Search the collection..."
          aria-label="Search products"
          className="h-12 w-full rounded-sm border border-(--color-border) bg-(--color-surface-muted) pl-11 pr-11 text-sm text-(--color-text-primary) outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-primary)] focus:bg-[var(--color-surface)]"
        />

        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)]"
          >
            <X size={16} />
          </button>
        )}
      </form>

      <div className="grid grid-cols-2 gap-3 sm:flex">
        <div className="relative">
          <SlidersHorizontal
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          />

          <select
            value={category}
            onChange={(event) =>
              updateParam("category", event.target.value)
            }
            aria-label="Filter by category"
            className="h-12 w-full appearance-none rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] pl-9 pr-8 text-sm font-medium text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-text-primary)] focus:bg-[var(--color-surface)] sm:min-w-44"
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <select
          value={sort}
          onChange={(event) =>
            updateParam(
              "sort",
              event.target.value as "latest" | "price-low" | "price-high",
            )
          }
          aria-label="Sort products"
          className="h-12 w-full appearance-none rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 text-sm font-medium text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-text-primary)] focus:bg-[var(--color-surface)] sm:min-w-44"
        >
          <option value="latest">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}