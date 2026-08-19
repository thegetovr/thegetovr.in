"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import CheckoutAddressCard from "@/components/checkout/CheckoutAddressCard";

interface SavedAddress {
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

interface SavedAddressesProps {
  selectedAddressId: string | null;
  onSelect: (address: SavedAddress) => void;
  onEdit: (address: SavedAddress) => void;
  onAddNew: () => void;
}

export default function SavedAddresses({
  selectedAddressId,
  onSelect,
  onEdit,
  onAddNew,
}: SavedAddressesProps) {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD ADDRESSES
  // =====================================================

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const response = await fetch("/api/addresses", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          console.error("Failed to load addresses:", data.message);
          return;
        }

        const savedAddresses = data.addresses as SavedAddress[];

        setAddresses(savedAddresses);

        // Automatically select default address
        const defaultAddress =
          savedAddresses.find((address) => address.isDefault) ??
          savedAddresses[0];

        if (defaultAddress) {
          onSelect(defaultAddress);
        }
      } catch (error) {
        console.error("LOAD ADDRESSES ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [onSelect]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-400">
        Loading saved addresses...
      </div>
    );
  }

  // =====================================================
  // NO ADDRESS
  // =====================================================

  if (addresses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-8 text-center">
        <p className="text-sm text-zinc-400">No saved addresses found.</p>

        <button
          type="button"
          onClick={onAddNew}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>
    );
  }

  // =====================================================
  // ADDRESS LIST
  // =====================================================

  return (
    <div>
      {/* HEADER */}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Saved Addresses</h3>

          <p className="mt-1 text-sm text-zinc-500">
            Select an address for delivery.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddNew}
          className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-900"
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      {/* ADDRESS CARDS */}

      <div className="space-y-3">
        {addresses.map((address) => (
          <CheckoutAddressCard
            key={address._id}
            address={address}
            selected={selectedAddressId === address._id}
            onSelect={() => onSelect(address)}
            onEdit={() => onEdit(address)}
          />
        ))}
      </div>
    </div>
  );
}
