"use client";

import { Sparkles } from "lucide-react";

const announcements = [
  "FREE DELIVERY ON ORDERS ABOVE ₹999",
  "NEW COLLECTION IS LIVE",
  "USE CODE GETOVR10 FOR 10% OFF",
  "PREMIUM QUALITY • SECURE CHECKOUT",
];

function AnnouncementItem({ text }: { text: string }) {
  return (
    <div className="flex shrink-0 items-center">
      <span className="mx-5 flex items-center gap-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.16em] text-white sm:mx-7 sm:text-[11px]">
        <Sparkles
          size={12}
          strokeWidth={1.5}
          className="text-[var(--color-accent)]"
        />

        {text}
      </span>

      <span className="text-[9px] text-[var(--color-accent)]">✦</span>
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="relative z-[60] w-full overflow-hidden bg-[var(--color-charcoal-900)] text-white">
      {/* Left Fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--color-charcoal-900)] to-transparent" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--color-charcoal-900)] to-transparent" />

      <div className="flex h-9 w-max items-center sm:h-10">
        {/* First Group */}
        <div className="flex shrink-0 animate-marquee items-center">
          {announcements.map((announcement, index) => (
            <AnnouncementItem key={`first-${index}`} text={announcement} />
          ))}
        </div>

        {/* Second Group */}
        <div
          className="flex shrink-0 animate-marquee items-center"
          aria-hidden="true"
        >
          {announcements.map((announcement, index) => (
            <AnnouncementItem key={`second-${index}`} text={announcement} />
          ))}
        </div>
      </div>
    </div>
  );
}
