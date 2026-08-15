import type { CustomerInfo } from "@/types/order";
interface CustomerCardProps {
  customer: CustomerInfo;
  variant?: "default" | "profile";
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <h2 className="mb-5 text-lg font-semibold text-black">Customer</h2>

      <div className="space-y-2">
        <p className="font-medium text-black text-xl font-semibold">
          {customer.firstName} {customer.lastName}
        </p>

        <p className="text-zinc-400">{customer.email}</p>

        <p className="text-zinc-400">{customer.phone}</p>
      </div>
    </section>
  );
}
