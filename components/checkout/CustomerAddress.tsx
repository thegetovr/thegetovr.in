"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

import SavedAddresses from "@/components/checkout/SavedAddresses";
import { useCheckoutStore } from "@/stores/checkoutStore";
import type { CheckoutFormData } from "@/lib/validation/checkoutSchema";

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

export default function CustomerAddress() {
  const router = useRouter();

  const { setCustomer, setIsValid } = useCheckoutStore();

  const {
    setValue,
    formState: { isValid },
  } = useFormContext<CheckoutFormData>();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  // =====================================================
  // SELECT ADDRESS
  // =====================================================

  const handleSelectAddress = useCallback(
    (address: SavedAddress) => {
      setSelectedAddressId(address._id);

      const nameParts = address.name.trim().split(/\s+/);

      const firstName = nameParts[0] ?? "";
      const lastName = nameParts.slice(1).join(" ");

      // React Hook Form
      setValue("firstName", firstName, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("lastName", lastName, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("phone", address.phone, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("address", address.address, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("city", address.city, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("state", address.state, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("pincode", address.pincode, {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Checkout Store
      setCustomer({
        firstName,
        lastName,
        email: "",
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      });
    },
    [setValue, setCustomer],
  );

  // =====================================================
  // EDIT ADDRESS
  // =====================================================

  const handleEditAddress = useCallback(
    (address: SavedAddress) => {
      router.push("/profile?tab=addresses");
    },
    [router],
  );

  // =====================================================
  // ADD NEW ADDRESS
  // =====================================================

  const handleAddNewAddress = useCallback(() => {
    router.push("/profile?tab=addresses");
  }, [router]);

  // =====================================================
  // VALIDATION
  // =====================================================

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid, setIsValid]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Delivery Address
      </h2>

      <SavedAddresses
        selectedAddressId={selectedAddressId}
        onSelect={handleSelectAddress}
        onEdit={handleEditAddress}
        onAddNew={handleAddNewAddress}
      />
    </div>
  );
}
