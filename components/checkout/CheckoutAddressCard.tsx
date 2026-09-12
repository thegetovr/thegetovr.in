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
      className={`border p-5 transition-colors duration-200 ${
        selected
          ? "border-(--color-text-primary) bg-(--color-surface)"
          : "border-(--color-border) bg-(--color-surface)"
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <button
          type="button"
          onClick={onSelect}
          className="flex min-w-0 flex-1 text-left"
        >
          <div className="flex gap-3">
            <div
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                selected
                  ? "border-(--color-text-primary) bg-(--color-text-primary)"
                  : "border-(--color-border) bg-(--color-surface)"
              }`}
              aria-hidden="true"
            >
              {selected && (
                <span className="h-2 w-2 rounded-full bg-(--color-white)" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-(--color-text-primary)">
                  {address.name}
                </h4>

                {address.isDefault && (
                  <span className="inline-flex items-center gap-1 bg-(--color-surface-muted) px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-primary)">
                    <Star size={10} fill="currentColor" />
                    Default
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-(--color-text-muted)">
                {address.phone}
              </p>

              <div className="mt-3 flex items-start gap-2 text-sm leading-6 text-(--color-text-secondary)">
                <MapPin
                  size={15}
                  className="mt-1 shrink-0 text-(--color-text-muted)"
                />

                <span>
                  {address.address}, {address.city}, {address.state} -{" "}
                  {address.pincode}
                </span>
              </div>
            </div>
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-2 sm:ml-4">
          <button
            type="button"
            onClick={onEdit}
            className="
              flex
              items-center
              gap-1.5
              border
              border-(--color-border)
              bg-(--color-surface)
              px-3
              py-2
              text-xs
              font-medium
              text-(--color-text-secondary)
              transition-colors
              duration-200
              hover:border-(--color-text-primary)
              hover:text-(--color-text-primary)
            "
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            type="button"
            onClick={onSelect}
            className={`px-3 py-2 text-xs font-medium transition-colors duration-200 ${
              selected
                ? "bg-(--color-text-primary) text-(--color-white)"
                : "border border-(--color-border) bg-(--color-surface) text-(--color-text-secondary) hover:border-(--color-text-primary) hover:text-(--color-text-primary)"
            }`}
          >
            {selected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
}