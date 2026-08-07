import type { Customer } from "@/types/customer";

type TopCustomersCardProps = {
  customers: Customer[];
};

export default function TopCustomersCard({
  customers,
}: TopCustomersCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white">
        Top Customers
      </h2>

      <div className="mt-6 space-y-4">
        {customers.length === 0 ? (
          <p className="text-sm text-zinc-400">
            No customer data available.
          </p>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-none last:pb-0"
            >
              <div>
                <p className="font-medium text-white">
                  {customer.firstName} {customer.lastName}
                </p>

                <p className="text-sm text-zinc-500">
                  {customer.totalOrders} orders
                </p>
              </div>

              <p className="font-semibold text-white">
                ₹{customer.totalSpent.toLocaleString("en-IN")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}