import Link from "next/link";
import type { AdminIcon } from "@/types/admin";

type QuickActionItemProps = {
  href: string;
  title: string;
  description: string;
  icon: AdminIcon;
};

export default function QuickActionItem({
  href,
  title,
  description,
  icon: Icon,
}: QuickActionItemProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors duration-200 group-hover:bg-zinc-700 group-hover:text-white">
        <Icon size={20} strokeWidth={2} />
      </div>

      <h3 className="mt-4 font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-xs text-zinc-400">
        {description}
      </p>
    </Link>
  );
}