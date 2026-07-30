import { ReactNode } from "react";

type QuickActionsCardProps = {
  children: ReactNode;
};

export default function QuickActionsCard({
  children,
}: QuickActionsCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Frequently used admin shortcuts.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        {children}
      </div>
    </div>
  );
}