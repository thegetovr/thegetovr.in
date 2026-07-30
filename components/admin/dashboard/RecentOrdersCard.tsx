import Link from "next/link";

type RecentOrdersCardProps = {
  children: React.ReactNode;
};

export default function RecentOrdersCard({ children }: RecentOrdersCardProps) {
  return (
    <section
      aria-labelledby="recent-orders-heading"
      className="rounded-2xl border border-zinc-800 bg-zinc-900"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <h2
          id="recent-orders-heading"
          className="text-lg font-semibold text-white"
        >
          Recent Orders
        </h2>

        <Link
  href="/admin/orders"
  aria-label="View all recent orders"
  className="text-sm font-medium text-zinc-400 transition hover:text-white"
>
  View All →
</Link>
      </div>

      <div className="p-2">{children}</div>
    </section>
  );
}
