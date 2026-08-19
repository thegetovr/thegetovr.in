"use client";

import { Search, X } from "lucide-react";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchFilter({
  value,
  onChange,
  placeholder = "Search...",
}: SearchFilterProps) {
  return (
    <div className="group relative flex-1">
      <Search
        size={18}
        strokeWidth={1.7}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#b7965d]"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[#ddd5ca] bg-white pl-11 pr-10 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-[#b7965d]"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-zinc-400 transition hover:text-black"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
