import type { CustomerInfo } from "@/types/order";
interface ShippingCardProps {
  customer: CustomerInfo;
}

export default function ShippingCard({
  customer,
}: ShippingCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Shipping Address
      </h2>

      <div className="space-y-2 text-zinc-300">
        <p>{customer.address}</p>
        <p>{customer.city}</p>
        <p>{customer.state}</p>
        <p>{customer.pincode}</p>
      </div>
    </section>
  );
}