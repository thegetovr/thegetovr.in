import type { CustomerInfo } from "@/types/order";

interface ShippingCardProps {
  customer: CustomerInfo;
}

export default function ShippingCard({ customer }: ShippingCardProps) {
  return (
    <section className="border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-subtle)">
      <h2 className="text-base font-semibold text-(--color-text-primary)">
        Delivery Address
      </h2>

      <div className="mt-5 space-y-1 text-sm leading-6 text-(--color-text-secondary)">
        <p className="mt-2">{customer.address}</p>

        <p>
          {customer.city}, {customer.state} - {customer.pincode}
        </p>

        <p>India</p>
      </div>
    </section>
  );
}