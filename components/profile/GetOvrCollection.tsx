"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function GetOvrCollection() {
  return (
    <div className="mt-5 group relative h-[235px] overflow-hidden rounded-xl border border-[#ddd5ca] bg-[#f7f1e8]">
      {/* =================================================
          SOFT DECORATIVE BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#e8d8c3]/70 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-12 h-32 w-32 rounded-full bg-[#efe3d3]/80 blur-3xl" />

      {/* =================================================
          PRODUCT IMAGE
      ================================================= */}

      <div
        className="pointer-events-none absolute right-[-5px] top-1/2 z-10
      h-[225px] w-[225px] -translate-y-1/2 transition-transform
      duration-500 group-hover:scale-[1.04]"
      >
        <Image
          src="/images/getovr-model.png"
          alt="GETOVR Collection"
          width={225}
          height={225}
          className="h-full w-full object-contain object-center mix-blend-multiply"
        />
      </div>

      {/* =================================================
          SOFT TEXT PROTECTION
      ================================================= */}

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[72%] bg-gradient-to-r from-[#f7f1e8] via-[#f7f1e8]/95 to-transparent" />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="relative z-30 flex h-full w-[62%] flex-col px-5 py-6">
        {/* EYEBROW */}

        <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#a67c35]">
          New Arrivals
        </p>

        {/* TITLE */}

        <h2 className="mt-2 font-serif text-[22px] leading-[23px] tracking-tight text-[#25221e]">
          Explore
          <br />
          <span className="text-[#a67c35]">GETOVR</span>
          <br />
          Collection
        </h2>

        {/* GOLD LINE */}

        <div className="mt-3 h-[2px] w-9 bg-[#b7965d]" />

        {/* DESCRIPTION */}

        <p className="mt-3 max-w-[155px] text-[10px] leading-[15px] text-[#81776b]">
          Discover our latest arrivals crafted for everyday style.
        </p>

        {/* BUTTON */}

        <div className="mt-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-lg border border-[#cbb99f]
            bg-[#eee3d5] hover:bg-[#e6d8c6] px-3.5 py-2 text-[10px] font-medium text-[#332f2a] shadow-sm
             backdrop-blur-sm transition-all duration-200 hover:shadow-md"
          >
            Shop Collection
            <ChevronRight
              size={18}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:translate-x-0.5 "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
