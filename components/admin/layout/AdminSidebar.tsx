"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation } from "@/lib/admin-navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 px-6 py-6">
        <h1 className="text-xl font-bold text-white">The Getovr</h1>

        <p className="mt-1 text-sm text-zinc-500">Admin Panel</p>
      </div>

      <nav aria-label="Admin navigation" className="flex-1 space-y-2 p-4">
        {adminNavigation.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-200 ${
                active
                  ? "bg-white font-semibold text-black"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={2} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
