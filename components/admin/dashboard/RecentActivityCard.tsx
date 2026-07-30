import { ReactNode } from "react";

type RecentActivityCardProps = {
  children: ReactNode;
};

export default function RecentActivityCard({
  children,
}: RecentActivityCardProps) {
  return (
    <section
  aria-labelledby="recent-activity-heading"
  className="rounded-2xl border border-zinc-800 bg-zinc-900"
>
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2
  id="recent-activity-heading"
  className="text-lg font-semibold text-white"
>
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Latest activity across your store.
        </p>
      </div>

      <div>{children}</div>
    </section>
  );
}