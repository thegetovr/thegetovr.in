import { getOrders } from "@/lib/orderService";
import { Order } from "@/types/order";
import type { RecentActivity } from "@/types/admin";
import { formatDate } from "@/lib/utils/date";

export type DashboardStats = {
  totalOrders: number;
  revenue: number;
  customers: number;
  pendingOrders: number;
  recentOrders: Order[];
  productionQueue: {
    printing: number;
    qualityCheck: number;
    packaging: number;
    shipped: number;
  };
  recentActivity: RecentActivity[];
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

  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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

  for (const order of orders) {
    revenue += order.total ?? 0;

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

  return {
    totalOrders: orders.length,
    revenue,
    customers: customers.size,
    pendingOrders,
    recentOrders: sortedOrders.slice(0, 5),
    productionQueue,
    recentActivity: getRecentActivity(sortedOrders),
  };
}