import type { CustomerInfo } from "@/types/order";

interface ShippingCardProps {
  customer: CustomerInfo;
}

export default function ShippingCard({ customer }: ShippingCardProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <h2 className="text-base font-semibold text-black">Delivery Address</h2>

      <div className="mt-5 space-y-1 text-sm leading-6 text-gray-500">
        <p className="mt-2">{customer.address}</p>

        <p>
          {customer.city}, {customer.state} - {customer.pincode}
        </p>

        <p>India</p>
      </div>
    </section>
  );
}
