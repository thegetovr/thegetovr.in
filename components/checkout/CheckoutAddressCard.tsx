"use client";

import { MapPin, Pencil, Star } from "lucide-react";

interface CheckoutAddress {
  _id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  isDefault: boolean;
}

interface CheckoutAddressCardProps {
  address: CheckoutAddress;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

export default function CheckoutAddressCard({
  address,
  selected,
  onSelect,
  onEdit,
}: CheckoutAddressCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 transition ${
        selected ? "border-white bg-zinc-800" : "border-zinc-800 bg-zinc-900"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* LEFT */}
        <button
          type="button"
          onClick={onSelect}
          className="flex min-w-0 flex-1 text-left"
        >
          <div className="flex gap-3">
            {/* RADIO */}
            <div
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                selected ? "border-white bg-white" : "border-zinc-600"
              }`}
            >
              {selected && <span className="h-2 w-2 rounded-full bg-black" />}
            </div>

            {/* DETAILS */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-white">{address.name}</h4>

                {address.isDefault && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-black">
                    <Star size={10} fill="currentColor" />
                    Default
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-zinc-400">{address.phone}</p>

              <div className="mt-2 flex items-start gap-2 text-sm leading-5 text-zinc-400">
                <MapPin size={15} className="mt-0.5 shrink-0" />

                <span>
                  {address.address}, {address.city}, {address.state} -{" "}
                  {address.pincode}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* RIGHT ACTIONS */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            type="button"
            onClick={onSelect}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
              selected
                ? "bg-white text-black"
                : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
            }`}
          >
            {selected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
}
