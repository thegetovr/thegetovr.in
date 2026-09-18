import type { CustomerInfo } from "@/types/order";

interface CustomerCardProps {
  customer: CustomerInfo;
  variant?: "default" | "profile";
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <section className="border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-subtle)">
      <h2 className="mb-5 text-lg font-semibold text-(--color-text-primary)">
        Customer
      </h2>

      <div className="space-y-2">
        <p className="text-xl font-semibold text-(--color-text-primary)">
          {customer.firstName} {customer.lastName}
        </p>

        <p className="text-(--color-text-secondary)">{customer.email}</p>

        <p className="text-(--color-text-secondary)">{customer.phone}</p>
      </div>
    </section>
  );
}