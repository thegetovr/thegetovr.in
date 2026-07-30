import { getOrders } from "@/lib/orderService";
import { Order } from "@/types/order";

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
};


export async function getDashboardStats(): Promise<DashboardStats> {
  const orders = await getOrders();

  const totalOrders = orders.length;

  const revenue = orders.reduce(
    (sum, order) => sum + (order.total ?? 0),
    0
  );

  const customers = new Set(
    orders.map((order) => order.customer.email)
  ).size;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);
    const productionQueue = {
  printing: orders.filter(
    (order) => order.status === "printing"
  ).length,

  qualityCheck: orders.filter(
    (order) => order.status === "quality-check"
  ).length,

  packaging: orders.filter(
    (order) => order.status === "packaging"
  ).length,

  shipped: orders.filter(
    (order) => order.status === "shipped"
  ).length,
};

  return {
  totalOrders,
  revenue,
  customers,
  pendingOrders,
  recentOrders,
  productionQueue,
};
}