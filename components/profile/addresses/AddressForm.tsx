"use client";

import { useEffect, useState } from "react";
import StateDropdown from "./StateDropdown";

export interface AddressFormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

interface AddressFormProps {
  initialData?: AddressFormData;
  isEditing?: boolean;
  saving?: boolean;
  onSubmit: (data: AddressFormData) => void | Promise<void>;
  onCancel: () => void;
}

const emptyForm: AddressFormData = {
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isDefault: false,
};

export default function AddressForm({
  initialData,
  isEditing = false,
  saving = false,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const [form, setForm] = useState<AddressFormData>(initialData ?? emptyForm);

  useEffect(() => {
    setForm(initialData ?? emptyForm);
  }, [initialData]);

  const handleChange = (
    field: keyof AddressFormData,
    value: string | boolean,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pincode.trim()
    ) {
      alert("Please fill all required address fields");
      return;
    }

    await onSubmit({
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim(),
      country: form.country.trim() || "India",
    });
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="min-w-0">
        <h2 className="text-lg font-semibold text-black sm:text-xl">
          {isEditing ? "Edit Address" : "Add New Address"}
        </h2>

        <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
          {isEditing
            ? "Update your saved delivery address."
            : "Save an address for faster checkout."}
        </p>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <form onSubmit={handleSubmit} className="mt-5 sm:mt-6">
        {/* =================================================
            NAME + PHONE
        ================================================= */}

        <div className="grid min-w-0 gap-4 md:grid-cols-2">
          {/* NAME */}

          <div className="min-w-0">
            <label className="mb-1.5 block text-sm font-medium text-black">
              Full Name
            </label>

            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Shivdeep Raina"
              required
              autoComplete="name"
              className="h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black outline-none transition focus:border-black sm:px-4"
            />
          </div>

          {/* PHONE */}

          <div className="min-w-0">
            <label className="mb-1.5 block text-sm font-medium text-black">
              Phone
            </label>

            <input
              value={form.phone}
              inputMode="numeric"
              type="tel"
              maxLength={10}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="9876543210"
              required
              autoComplete="tel"
              className="h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black outline-none transition focus:border-black sm:px-4"
            />
          </div>
        </div>

        {/* =================================================
            ADDRESS
        ================================================= */}

        <div className="mt-4 min-w-0">
          <label className="mb-1.5 block text-sm font-medium text-black">
            Address
          </label>

          <input
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="House No, Street, Area, Landmark"
            required
            autoComplete="street-address"
            className="h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black outline-none transition focus:border-black sm:px-4"
          />
        </div>

        {/* =================================================
            CITY + STATE + PINCODE
        ================================================= */}

        <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-3">
          {/* CITY */}

          <div className="min-w-0">
            <label className="mb-1.5 block text-sm font-medium text-black">
              City
            </label>

            <input
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Jammu"
              required
              autoComplete="address-level2"
              className="h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black outline-none transition focus:border-black sm:px-4"
            />
          </div>

          {/* STATE */}

          <div className="min-w-0">
            <label className="mb-1.5 block text-sm font-medium text-black">
              State
            </label>

            <StateDropdown
              value={form.state}
              onChange={(value) => handleChange("state", value)}
            />
          </div>

          {/* PINCODE */}

          <div className="min-w-0">
            <label className="mb-1.5 block text-sm font-medium text-black">
              Pincode
            </label>

            <input
              value={form.pincode}
              inputMode="numeric"
              maxLength={6}
              onChange={(e) =>
                handleChange("pincode", e.target.value.replace(/\D/g, ""))
              }
              placeholder="180001"
              required
              autoComplete="postal-code"
              className="h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black outline-none transition focus:border-black sm:px-4"
            />
          </div>
        </div>

        {/* =================================================
            COUNTRY
        ================================================= */}

        <div className="mt-4 min-w-0">
          <label className="mb-1.5 block text-sm font-medium text-black">
            Country
          </label>

          <input
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
            placeholder="India"
            required
            autoComplete="country-name"
            className="h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black outline-none transition focus:border-black sm:px-4"
          />
        </div>

        {/* =================================================
            DEFAULT ADDRESS
        ================================================= */}

        <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => handleChange("isDefault", e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-black"
          />

          <span className="leading-5">Make this my default address</span>
        </label>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
          >
            {saving ? "Saving..." : isEditing ? "Save Changes" : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
}
