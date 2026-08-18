"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // No pagination needed
  if (totalPages <= 1) {
    return null;
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-1.5">
      {/* PREVIOUS */}

      <button
        type="button"
        onClick={goToPrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-[#f5f1eb] hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={16} />
      </button>

      {/* PAGE NUMBERS */}

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => {
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-medium transition ${
                isActive
                  ? "bg-[#eee3d5] text-black"
                  : "text-zinc-600 hover:bg-[#f5f1eb] hover:text-black"
              }`}
            >
              {page}
            </button>
          );
        },
      )}

      {/* NEXT */}

      <button
        type="button"
        onClick={goToNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-[#f5f1eb] hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
