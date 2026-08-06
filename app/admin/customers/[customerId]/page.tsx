import { notFound } from "next/navigation";
import Link from "next/link";
import { getCustomerById, getCustomerOrders } from "@/lib/customerService";
import CustomerDetailsCard from "@/components/admin/customers/CustomerDetailsCard";
import CustomerOrdersCard from "@/components/admin/customers/CustomerOrdersCard";
type CustomerPageProps = {
  params: Promise<{
    customerId: string;
  }>;
};

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { customerId } = await params;

  const email = decodeURIComponent(customerId);

  const customer = await getCustomerById(email);
  const orders = await getCustomerOrders(email);

  if (!customer) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6">
        <Link
          href="/admin/customers"
          className="inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
        >
          ← Back to Customers
        </Link>
      </div>
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h1 className="text-2xl font-bold text-white">
          {customer.firstName} {customer.lastName}
        </h1>

        <p className="mt-2 text-zinc-400">{customer.email}</p>

        <div className="mt-8">
          <CustomerDetailsCard customer={customer} orders={orders} />
        </div>

        <CustomerOrdersCard orders={orders} />
      </section>
    </main>
  );
}
export const metadata = {
  title: "Customer Details | The Getovr Admin",
};