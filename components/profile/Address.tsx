"use client";

import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";

interface Address {
  id: number;
  label: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  isDefault: boolean;
}

const addresses: Address[] = [
  {
    id: 1,
    label: "DEFAULT ADDRESS",
    name: "Shivdeep Raina",
    phone: "+91 98765 43210",
    addressLine1: "123, Green Street, Model Town,",
    addressLine2: "Jammu, Jammu & Kashmir - 180001",
    country: "India",
    isDefault: true,
  },
  {
    id: 2,
    label: "Raina House",
    name: "Shivdeep Raina",
    phone: "+91 98765 43210",
    addressLine1: "Ward No. 12, Near Post Office,",
    addressLine2: "Vijaypur, Samba - 184120",
    country: "Jammu & Kashmir, India",
    isDefault: false,
  },
  {
    id: 3,
    label: "Shivdeep Raina (Office)",
    name: "Shivdeep Raina",
    phone: "+91 98765 43210",
    addressLine1: "Getovr Office, 2nd Floor, Tech Park,",
    addressLine2: "Transport Nagar, Jammu - 180012",
    country: "Jammu & Kashmir, India",
    isDefault: false,
  },
];

export default function Addresses() {
  return (
    <section className="min-w-0 flex-1 bg-white px-8 py-7">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-black">
            My Addresses
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} strokeWidth={1.8} />
          Add New Address
        </button>
      </div>

      {/* =====================================================
          ADDRESS LIST
      ===================================================== */}

      <div className="mt-7 space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div>
                {/* Default Badge */}
                {address.isDefault ? (
                  <span className="inline-flex rounded-md bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {address.label}
                  </span>
                ) : (
                  <h2 className="text-lg font-semibold text-black">
                    {address.label}
                  </h2>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-sm font-medium text-black transition hover:text-gray-500"
                >
                  <Pencil size={16} strokeWidth={1.8} />
                  Edit
                </button>

                <div className="h-4 w-px bg-gray-200" />

                <button
                  type="button"
                  className="flex items-center gap-1.5 text-sm font-medium text-black transition hover:text-red-600"
                >
                  <Trash2 size={16} strokeWidth={1.8} />
                  Delete
                </button>
              </div>
            </div>

            {/* Address Information */}
            <div className="mt-4">
              <h3 className="text-base font-semibold text-black">
                {address.name}
              </h3>

              <p className="mt-1 text-sm text-gray-600">{address.phone}</p>

              <div className="mt-3 text-sm leading-6 text-gray-600">
                <p>{address.addressLine1}</p>

                <p>{address.addressLine2}</p>

                <p>{address.country}</p>
              </div>
            </div>

            {/* Make Default */}
            {!address.isDefault && (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-gray-50"
                >
                  Make Default
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* =====================================================
          SECURE & SAFE
      ===================================================== */}

      <div className="mt-5 flex items-center gap-4 rounded-xl bg-gray-50 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
          <ShieldCheck size={21} strokeWidth={1.8} className="text-black" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-black">Secure & Safe</h3>

          <p className="mt-1 text-xs text-gray-500">
            Your addresses are securely saved and will be used only for delivery
            purposes.
          </p>
        </div>
      </div>
    </section>
  );
}
