"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface Announcement {
  _id: string;
  text: string;
  order: number;
}

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
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const response = await fetch("/api/announcements", {
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setAnnouncements(data.announcements ?? []);
        }
      } catch (error) {
        console.error("❌ Failed to load announcements:", error);
      }
    }

    fetchAnnouncements();
  }, []);

  if (announcements.length === 0) {
    return null;
  }

  /*
   * Repeat the announcements so the marquee
   * always has enough content to cover the screen.
   */
  const loopAnnouncements = [...announcements, ...announcements];

  return (
    <div className="relative z-[60] w-full overflow-hidden bg-[var(--color-charcoal-900)] text-white">
      {/* Left Fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--color-charcoal-900)] to-transparent" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--color-charcoal-900)] to-transparent" />

      <div className="flex h-9 w-max animate-marquee items-center sm:h-10">
        {/* First Group */}
        <div className="flex shrink-0 items-center">
          {loopAnnouncements.map((announcement, index) => (
            <AnnouncementItem
              key={`first-${announcement._id}-${index}`}
              text={announcement.text}
            />
          ))}
        </div>

        {/* Second Group */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {loopAnnouncements.map((announcement, index) => (
            <AnnouncementItem
              key={`second-${announcement._id}-${index}`}
              text={announcement.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
