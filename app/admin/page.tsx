import StatsCard from "@/components/admin/dashboard/StatsCard";
import RecentOrdersCard from "@/components/admin/dashboard/RecentOrdersCard";
import RecentOrderItem from "@/components/admin/dashboard/RecentOrderItem";
import ProductionQueueCard from "@/components/admin/dashboard/ProductionQueueCard";
import ProductionQueueItem from "@/components/admin/dashboard/ProductionQueueItem";
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

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentOrdersCard>
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => (
                <RecentOrderItem
                  key={order.orderNumber}
                  orderNumber={order.orderNumber}
                  customerName={`${order.customer.firstName} ${order.customer.lastName}`}
                  status={order.status}
                  total={order.total}
                  createdAt={new Date(order.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                />
              ))
            ) : (
              <div className="py-8 text-center text-zinc-400">
                No recent orders yet.
              </div>
            )}
          </RecentOrdersCard>
        </div>

        <ProductionQueueCard
  isEmpty={
    stats.productionQueue.printing === 0 &&
    stats.productionQueue.qualityCheck === 0 &&
    stats.productionQueue.packaging === 0 &&
    stats.productionQueue.shipped === 0
  }
>
          <ProductionQueueItem
            label="Printing"
            status="printing"
            count={stats.productionQueue.printing}
          />

          <ProductionQueueItem
            label="Quality Check"
            status="quality-check"
            count={stats.productionQueue.qualityCheck}
          />

          <ProductionQueueItem
            label="Packaging"
            status="packaging"
            count={stats.productionQueue.packaging}
          />

          <ProductionQueueItem
            label="Shipped"
            status="shipped"
            count={stats.productionQueue.shipped}
          />
        </ProductionQueueCard>
      </div>
    </div>
  );
}