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
    <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6">
      {/* =====================================================
          TOP ROW
      ===================================================== */}

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        {/* ADDRESS TYPE */}

        <div className="min-w-0">
          {address.isDefault ? (
            <span
              className="
                inline-flex
                max-w-full
                items-center
                gap-1.5
                rounded-md
                bg-[#e6d8c6]
                px-3
                py-1.5
                text-[10px]
                font-semibold
                uppercase
                tracking-wide
                text-zinc-900
              "
            >
              <Star size={12} fill="currentColor" className="shrink-0" />

              <span className="truncate">Default Address</span>
            </span>
          ) : (
            <h2 className="text-base font-semibold text-black sm:text-lg">
              Saved Address
            </h2>
          )}
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={() => onEdit(address)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-black transition hover:text-gray-500"
          >
            <Pencil size={16} strokeWidth={1.8} className="shrink-0" />
            Edit
          </button>

          <div className="h-4 w-px shrink-0 bg-gray-200" />

          <button
            type="button"
            onClick={() => onDelete(address._id)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-black transition hover:text-red-600"
          >
            <Trash2 size={16} strokeWidth={1.8} className="shrink-0" />
            Delete
          </button>
        </div>
      </div>

      {/* =====================================================
          ADDRESS INFORMATION
      ===================================================== */}

      <div className="mt-4 min-w-0">
        <h3 className="break-words text-base font-semibold text-black">
          {address.name}
        </h3>

        <p className="mt-1 break-words text-sm text-gray-600">
          {address.phone}
        </p>

        <div className="mt-3 min-w-0 text-sm leading-6 text-gray-600">
          <p className="break-words">{address.address}</p>

          <p className="break-words">
            {address.city}, {address.state} - {address.pincode}
          </p>

          <p className="break-words">{address.country}</p>
        </div>
      </div>

      {/* =====================================================
          MAKE DEFAULT
      ===================================================== */}

      {!address.isDefault && (
        <div className="mt-5 flex justify-start sm:justify-end">
          <button
            type="button"
            onClick={() => onMakeDefault(address._id)}
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              rounded-lg
              border
              border-gray-200
              px-4
              py-2.5
              text-sm
              font-medium
              text-black
              transition
              hover:bg-gray-50
              sm:px-5
            "
          >
            Make Default
          </button>
        </div>
      )}
    </div>
  );
}
