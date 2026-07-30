import StatsCard from "@/components/admin/dashboard/StatsCard";
import RecentOrdersCard from "@/components/admin/dashboard/RecentOrdersCard";
import RecentOrderItem from "@/components/admin/dashboard/RecentOrderItem";
import ProductionQueueCard from "@/components/admin/dashboard/ProductionQueueCard";
import ProductionQueueItem from "@/components/admin/dashboard/ProductionQueueItem";
import QuickActionsCard from "@/components/admin/dashboard/QuickActionsCard";
import QuickActionItem from "@/components/admin/dashboard/QuickActionItem";
import { getDashboardStats } from "@/lib/dashboardService";
import RecentActivityCard from "@/components/admin/dashboard/RecentActivityCard";
import RecentActivityItem from "@/components/admin/dashboard/RecentActivityItem";
import {
  OrdersIcon,
  ProductsIcon,
  CustomersIcon,
  CouponsIcon,
} from "@/components/admin/icons";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>

        <p className="mt-2 text-zinc-400">
          Welcome to The Getovr Admin Dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          subtitle="Orders received"
        />

        <StatsCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString("en-IN")}`}
          subtitle="Total sales"
        />

        <StatsCard
          title="Customers"
          value={stats.customers}
          subtitle="Registered customers"
        />

        <StatsCard
          title="Pending"
          value={stats.pendingOrders}
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
                    },
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

        <div className="space-y-6">
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

          <QuickActionsCard>
            <QuickActionItem
              href="/admin/orders"
              title="Orders"
              description="Manage customer orders"
              icon={OrdersIcon}
            />

            <QuickActionItem
              href="/admin/products"
              title="Products"
              description="Manage catalog"
              icon={ProductsIcon}
            />

            <QuickActionItem
              href="/admin/customers"
              title="Customers"
              description="View customers"
              icon={CustomersIcon}
            />

            <QuickActionItem
              href="/admin/coupons"
              title="Coupons"
              description="Manage discounts"
              icon={CouponsIcon}
            />
          </QuickActionsCard>
          <RecentActivityCard>
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity) => (
                <RecentActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <div className="py-8 text-center text-zinc-400">
                No recent activity yet.
              </div>
            )}
          </RecentActivityCard>
        </div>
      </div>
    </div>
  );
}
