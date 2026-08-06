import type { Customer } from "@/types/customer";
import type { Order } from "@/types/order";

type CustomerDetailsCardProps = {
  customer: Customer;
  orders: Order[];
};

export default function CustomerDetailsCard({
  customer,
  orders,
}: CustomerDetailsCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Orders
        </p>

        <p className="mt-2 text-2xl font-semibold text-white">
          {customer.totalOrders}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Total Spent
        </p>

        <p className="mt-2 text-2xl font-semibold text-white">
          ₹{customer.totalSpent.toLocaleString()}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Phone
        </p>

        <p className="mt-2 text-white">
          {customer.phone}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          Address
        </p>

        <p className="mt-2 text-white">
          {orders[0]?.customer.address}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          City
        </p>

        <p className="mt-2 text-white">
          {orders[0]?.customer.city}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5">
        <p className="text-sm text-zinc-400">
          State
        </p>

        <p className="mt-2 text-white">
          {orders[0]?.customer.state}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-5 md:col-span-3">
        <p className="text-sm text-zinc-400">
          Pincode
        </p>

        <p className="mt-2 text-white">
          {orders[0]?.customer.pincode}
        </p>
      </div>
    </div>
  );
}