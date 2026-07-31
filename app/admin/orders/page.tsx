import OrdersFilters from "@/components/admin/orders/OrdersFilters";
import OrdersHeader from "@/components/admin/orders/OrdersHeader";
import OrdersTable from "@/components/admin/orders/OrdersTable";

import { getOrders } from "@/lib/orderService";

import type { OrderStatus } from "@/types/order";

type AdminOrdersPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: OrderStatus;
  }>;
};

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const { search = "", status } = await searchParams;

  const orderList = await getOrders({
    search,
    status,
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <OrdersHeader totalOrders={orderList.length} />

        <OrdersFilters
          search={search}
          status={status}
        />

        <OrdersTable orders={orderList} />
      </section>
    </main>
  );
}