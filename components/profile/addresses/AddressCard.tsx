"use client";

import { Pencil, Star, Trash2 } from "lucide-react";

export interface AddressCardData {
  _id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: AddressCardData;
  onEdit: (address: AddressCardData) => void;
  onDelete: (id: string) => void;
  onMakeDefault: (id: string) => void;
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onMakeDefault,
}: AddressCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      {/* TOP ROW */}

      <div className="flex items-start justify-between">
        <div>
          {address.isDefault ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-md 
            bg-[#e6d8c6]  px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-900"
            >
              <Star size={12} fill="currentColor" />
              Default Address
            </span>
          ) : (
            <h2 className="text-lg font-semibold text-black">Saved Address</h2>
          )}
        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onEdit(address)}
            className="flex items-center gap-1.5 text-sm font-medium text-black transition hover:text-gray-500"
          >
            <Pencil size={16} strokeWidth={1.8} />
            Edit
          </button>

          <div className="h-4 w-px bg-gray-200" />

          <button
            type="button"
            onClick={() => onDelete(address._id)}
            className="flex items-center gap-1.5 text-sm font-medium text-black transition hover:text-red-600"
          >
            <Trash2 size={16} strokeWidth={1.8} />
            Delete
          </button>
        </div>
      </div>

      {/* ADDRESS INFORMATION */}

      <div className="mt-4">
        <h3 className="text-base font-semibold text-black">{address.name}</h3>

        <p className="mt-1 text-sm text-gray-600">{address.phone}</p>

        <div className="mt-3 text-sm leading-6 text-gray-600">
          <p>{address.address}</p>

          <p>
            {address.city}, {address.state} - {address.pincode}
          </p>

          <p>{address.country}</p>
        </div>
      </div>

      {/* MAKE DEFAULT */}

      {!address.isDefault && (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => onMakeDefault(address._id)}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-gray-50"
          >
            Make Default
          </button>
        </div>
      )}
    </div>
  );
}
