import { getOrders, searchOrders } from "@/lib/orderService";

import OrdersHeader from "@/components/admin/orders/OrdersHeader";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import SearchBar from "@/components/admin/orders/SearchBar";

type AdminOrdersPageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const { search = "" } = await searchParams;

  const orderList = search
    ? await searchOrders(search)
    : await getOrders();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Orders
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage customer orders and update their production status.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <OrdersHeader totalOrders={orderList.length} />

        <div className="mb-6">
          <SearchBar defaultValue={search} />
        </div>

        <OrdersTable orders={orderList} />
      </section>
    </main>
  );
}