"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation } from "@/lib/admin-navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 px-6 py-6">
        <h1 className="text-xl font-bold text-white">
          The Getovr
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {adminNavigation.map((item) => (
          <Link
  key={item.href}
  href={item.href}
  className={`block rounded-lg px-4 py-3 text-sm transition ${
    pathname === item.href
      ? "bg-white font-semibold text-black"
      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
  }`}
>
  {item.name}
</Link>
        ))}
      </nav>
    </aside>
  );
}