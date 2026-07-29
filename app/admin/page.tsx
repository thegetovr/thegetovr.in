import StatsCard from "@/components/admin/dashboard/StatsCard";
import { getDashboardStats } from "@/lib/dashboardService";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Welcome to The Getovr Admin Dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          subtitle="Orders received"
        />

        <StatsCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString("en-IN")}`}
          subtitle="Total sales"
        />

        <StatsCard
          title="Customers"
          value={stats.customers.toString()}
          subtitle="Registered customers"
        />

        <StatsCard
          title="Pending"
          value={stats.pendingOrders.toString()}
          subtitle="Awaiting production"
        />
      </div>
    </div>
  );
}