import { getOrders } from "@/lib/orderService";
import Coupon from "@/models/Coupon";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/types/order";
import type { RecentActivity } from "@/types/admin";
import { formatDate } from "@/lib/utils/date";

export type DashboardStats = {
  totalOrders: number;
  revenue: number;
  customers: number;
  totalCoupons: number;
  pendingOrders: number;
  recentOrders: Order[];
  productionQueue: {
    printing: number;
    qualityCheck: number;
    packaging: number;
    shipped: number;
  };
  recentActivity: RecentActivity[];

  revenueTrend: {
    label: string;
    revenue: number;
  }[];
};

function getRecentActivity(sortedOrders: Order[]): RecentActivity[] {
  return sortedOrders.slice(0, 5).map((order) => ({
    id: order.orderNumber,
    type: "order",
    title: `Order ${order.orderNumber}`,
    description: `New order placed by ${order.customer.firstName} ${order.customer.lastName}`,
    createdAt: formatDate(order.createdAt),
  }));
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const orders = await getOrders();
  await connectToDatabase();

  const totalCoupons = await Coupon.countDocuments();

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const customers = new Set<string>();

  let revenue = 0;
  let pendingOrders = 0;

  const productionQueue = {
    printing: 0,
    qualityCheck: 0,
    packaging: 0,
    shipped: 0,
  };
  const revenueMap = new Map<string, number>();

  for (const order of orders) {
    revenue += order.total ?? 0;
    const month = new Date(order.createdAt).toLocaleDateString("en-IN", {
      month: "short",
      year: "2-digit",
    });

    revenueMap.set(month, (revenueMap.get(month) ?? 0) + (order.total ?? 0));

    customers.add(order.customer.email);

    switch (order.status) {
      case "pending":
        pendingOrders++;
        break;

      case "printing":
        productionQueue.printing++;
        break;

      case "quality-check":
        productionQueue.qualityCheck++;
        break;

      case "packaging":
        productionQueue.packaging++;
        break;

      case "shipped":
        productionQueue.shipped++;
        break;
    }
  }
  const revenueTrend = Array.from(revenueMap.entries()).map(
    ([label, revenue]) => ({
      label,
      revenue,
    }),
  );

  return {
    totalOrders: orders.length,
    revenue,
    customers: customers.size,
    totalCoupons,
    pendingOrders,
    recentOrders: sortedOrders.slice(0, 5),
    productionQueue,
    recentActivity: getRecentActivity(sortedOrders),
    revenueTrend,
  };
}