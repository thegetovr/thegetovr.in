import type { CustomerInfo } from "@/types/order";

type CustomerDetailsCardProps = {
  customer: CustomerInfo;
};

export default function CustomerDetailsCard({
  customer,
}: CustomerDetailsCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Customer Information
      </h2>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-zinc-500">Name</p>
          <p className="mt-1 font-medium text-white">
            {customer.firstName} {customer.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Email</p>
          <p className="mt-1 text-zinc-300">
            {customer.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Phone</p>
          <p className="mt-1 text-zinc-300">
            {customer.phone}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Shipping Address
          </p>

          <div className="mt-1 space-y-1 text-zinc-300">
            <p>{customer.address}</p>
            <p>
              {customer.city}, {customer.state}
            </p>
            <p>{customer.pincode}</p>
          </div>
        </div>
      </div>
    </section>
  );
}