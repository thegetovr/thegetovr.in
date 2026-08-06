import Link from "next/link";

type CustomerRowActionsProps = {
  customerId: string;
};

export default function CustomerRowActions({
  customerId,
}: CustomerRowActionsProps) {
  return (
    <Link
      href={`/admin/customers/${encodeURIComponent(
        customerId,
      )}`}
      className="inline-flex rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
    >
      View
    </Link>
  );
}