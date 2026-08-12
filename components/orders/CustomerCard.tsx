import type { CustomerInfo } from "@/types/order";
interface CustomerCardProps {
  customer: CustomerInfo;
  variant?: "default" | "profile";
}

export default function CustomerCard({
  customer,
  variant = "default",
}: CustomerCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">Customer</h2>

      <div className="space-y-2">
        <p className="font-medium text-white">
          {customer.firstName} {customer.lastName}
        </p>

        <p className="text-zinc-400">{customer.email}</p>

        <p className="text-zinc-400">{customer.phone}</p>
      </div>
    </section>
  );
}
