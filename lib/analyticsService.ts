import { getDashboardStats } from "@/lib/dashboardService";
import { getCustomers } from "@/lib/customerService";
import { getProducts } from "@/lib/productService";
export async function getAnalytics() {
  const [dashboard, customers, products] = await Promise.all([
    getDashboardStats(),
    getCustomers(),
    getProducts(),
  ]);

  const topCustomers = [...customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);
  const lowStockProducts = [...products]
  .sort((a, b) => a.stock - b.stock)
  .slice(0, 5);
  return {
    ...dashboard,
    topCustomers,
    lowStockProducts,
  };
}
