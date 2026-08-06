import CustomerTable from "@/components/admin/customers/CustomerTable";
import CustomerStats from "@/components/admin/customers/CustomerStats";
import CustomerToolbar from "@/components/admin/customers/CustomerToolbar";

import { getCustomers } from "@/lib/customerService";

type AdminCustomersPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function AdminCustomersPage({
  searchParams,
}: AdminCustomersPageProps) {
  const { search = "", status = "" } = await searchParams;

  const customers = await getCustomers({
    search,
    status: status === "active" || status === "inactive" ? status : "",
  });
  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0,
  );
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Customers</h2>

            <p className="mt-1 text-sm text-zinc-400">
              View and manage your customers.
            </p>
          </div>

          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
            {customers.length} Customers
          </span>
        </div>

        <>
          <CustomerStats
            totalCustomers={customers.length}
            activeCustomers={
              customers.filter((customer) => customer.status === "active")
                .length
            }
            totalRevenue={totalRevenue}
          />

          <CustomerToolbar search={search} status={status} />

          <CustomerTable customers={customers} />
        </>
      </section>
    </main>
  );
}
export const metadata = {
  title: "Customers | The Getovr Admin",
};