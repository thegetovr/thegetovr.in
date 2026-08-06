import Link from "next/link";

type CustomerOrderRowActionsProps = {
  orderNumber: string;
};

export default function CustomerOrderRowActions({
  orderNumber,
}: CustomerOrderRowActionsProps) {
  return (
    <Link
      href={`/admin/orders/${orderNumber}`}
      className="inline-flex rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
    >
      View Order
    </Link>
  );
}