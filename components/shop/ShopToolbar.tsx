"use client";

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

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 md:flex-row md:items-center md:justify-between">
      <input
        defaultValue={search}
        onBlur={(e) => updateParam("search", e.target.value)}
        type="text"
        placeholder="Search products..."
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 outline-none focus:border-white md:max-w-sm"
      />

      <select
        defaultValue={category}
        onChange={(e) => updateParam("category", e.target.value)}
        className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        defaultValue={sort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2"
      >
        <option value="latest">Latest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}
