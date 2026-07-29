import { getOrders } from "@/lib/orderService";

export type DashboardStats = {
  totalOrders: number;
  revenue: number;
  customers: number;
  pendingOrders: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const orders = await getOrders();

  const totalOrders = orders.length;

  const revenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const customers = new Set(
    orders.map((order) => order.customer.email)
  ).size;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  return {
    totalOrders,
    revenue,
    customers,
    pendingOrders,
  };
}