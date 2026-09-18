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
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-(--color-text-muted)">
            Order Number
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-(--color-text-primary)">
            {orderNumber}
          </h1>

          <p className="mt-2 text-sm text-(--color-text-secondary)">
            Placed on{" "}
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mt-2 text-sm text-(--color-text-secondary)">
            Status:{" "}
            <span className="font-medium text-(--color-text-primary)">
              {status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}