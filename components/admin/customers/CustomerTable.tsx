import CustomerRowActions from "./CustomerRowActions";
import CustomerStatusBadge from "./CustomerStatusBadge";

import { formatCurrency, formatDate } from "@/lib/format";;
import type { Customer } from "@/types/customer";

type CustomerTableProps = {
  customers: Customer[];
};

const tableGrid =
  "grid min-w-[1100px] grid-cols-[2fr_2fr_1.4fr_1fr_1fr_1fr_1fr_0.8fr] items-center";

export default function CustomerTable({ customers }: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-8 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-2xl">
          👤
        </div>

        <h3 className="text-lg font-semibold text-white">No customers found</h3>

        <p className="mt-2 text-sm text-zinc-400">
          Customers will appear after the first order is placed.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <div
        className={`${tableGrid} border-b border-zinc-800 bg-zinc-900 px-6 py-4 text-sm font-medium text-zinc-400`}
      >
        <div>Customer</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Orders</div>
        <div>Total Spent</div>
        <div>Status</div>
        <div>Joined</div>
        <div>Actions</div>
      </div>

      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`${tableGrid} border-b border-zinc-800 px-6 py-4 last:border-b-0`}
        >
          <div className="text-white font-medium">
            {customer.firstName} {customer.lastName}
          </div>

          <div className="text-zinc-300">{customer.email}</div>

          <div className="text-zinc-300">{customer.phone}</div>

          <div className="text-white">{customer.totalOrders}</div>

          <div className="text-white">
            {formatCurrency(customer.totalSpent)}
          </div>

          <div>
            <CustomerStatusBadge status={customer.status} />
          </div>

          <div className="text-zinc-400">{formatDate(customer.joinedAt)}</div>

          <div>
            <CustomerRowActions customerId={customer.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
