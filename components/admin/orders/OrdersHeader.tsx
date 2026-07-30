type OrdersHeaderProps = {
  totalOrders: number;
};

export default function OrdersHeader({
  totalOrders,
}: OrdersHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">
          All Orders
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          View and manage customer orders.
        </p>
      </div>

      <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
        {totalOrders} Orders
      </span>
    </div>
  );
}