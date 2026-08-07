import OrderStatusCard from "@/components/admin/analytics/OrderStatusCard";
import StatsCard from "@/components/admin/dashboard/StatsCard";
import { getAnalytics } from "@/lib/analyticsService";
import RevenueChart from "@/components/admin/analytics/RevenueChart";
import TopCustomersCard from "@/components/admin/analytics/TopCustomersCard";
import LowStockProductsCard from "@/components/admin/analytics/LowStockProductsCard";

export const metadata = {
  title: "Analytics | The Getovr Admin",
};

export default async function AdminAnalyticsPage() {
  const stats = await getAnalytics();
  const averageOrderValue =
    stats.totalOrders === 0 ? 0 : stats.revenue / stats.totalOrders;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white">Analytics</h2>

          <p className="mt-1 text-sm text-zinc-400">
            Business performance overview.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Revenue"
            value={`₹${stats.revenue.toLocaleString("en-IN")}`}
            subtitle="Total sales"
          />

          <StatsCard
            title="Average Order"
            value={`₹${averageOrderValue.toFixed(0)}`}
            subtitle="Average order value"
          />

          <StatsCard
            title="Customers"
            value={stats.customers}
            subtitle="Registered customers"
          />

          <StatsCard
            title="Coupons"
            value={stats.totalCoupons}
            subtitle="Available coupons"
          />
        </div>
        <div className="mt-10">
          <h3 className="mb-6 text-lg font-semibold text-white">
            Order Status Breakdown
          </h3>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            <OrderStatusCard
              title="Printing"
              count={stats.productionQueue.printing}
            />

            <OrderStatusCard
              title="Quality Check"
              count={stats.productionQueue.qualityCheck}
            />

            <OrderStatusCard
              title="Packaging"
              count={stats.productionQueue.packaging}
            />

            <OrderStatusCard
              title="Shipped"
              count={stats.productionQueue.shipped}
            />

            <OrderStatusCard title="Pending" count={stats.pendingOrders} />
          </div>
          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RevenueChart data={stats.revenueTrend} />
            </div>

            <div className="space-y-6">
              <TopCustomersCard customers={stats.topCustomers} />

              <LowStockProductsCard products={stats.lowStockProducts} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
