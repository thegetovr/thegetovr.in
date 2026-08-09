

interface OrderHeaderProps {
  orderNumber: string;
  createdAt: string;
}

export default function OrderHeader({
  orderNumber,
  createdAt,
}: OrderHeaderProps) {
  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            Order Number
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {orderNumber}
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Placed on{" "}
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}