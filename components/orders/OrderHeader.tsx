import StatusBadge from "./StatusBadge";

interface OrderHeaderProps {
  orderNumber: string;
  status: string;
  createdAt: string;
}

export default function OrderHeader({
  orderNumber,
  status,
  createdAt,
}: OrderHeaderProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            Order Number
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {orderNumber}
          </h1>

          <p className="mt-4 text-sm text-zinc-400">
            Placed on{" "}
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <StatusBadge status={status} />
      </div>
    </section>
  );
}