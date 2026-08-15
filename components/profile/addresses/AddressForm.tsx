"use client";

import { useEffect, useState } from "react";

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
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-black">
            {isEditing ? "Edit Address" : "Add New Address"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {isEditing
              ? "Update your saved delivery address."
              : "Save an address for faster checkout."}
          </p>
        </div>
      </div>

      {/* FORM */}

      <form onSubmit={handleSubmit} className="mt-6">
        {/* NAME + PHONE */}

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              Full Name
            </label>

            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Shivdeep Raina"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              Phone
            </label>

            <input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="9876543210"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
            />
          </div>
        </div>

        {/* ADDRESS */}

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-black">
            Address
          </label>

          <input
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="House No, Street, Area, Landmark"
            required
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
          />
        </div>

        {/* CITY + STATE + PINCODE */}

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              City
            </label>

            <input
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Jammu"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              State
            </label>

            <input
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="Jammu & Kashmir"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              Pincode
            </label>

            <input
              value={form.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
              placeholder="180001"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
            />
          </div>
        </div>

        {/* COUNTRY */}

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-black">
            Country
          </label>

          <input
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
            placeholder="India"
            required
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
          />
        </div>

        {/* DEFAULT */}

        <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => handleChange("isDefault", e.target.checked)}
            className="h-4 w-4 accent-black"
          />
          Make this my default address
        </label>

        {/* BUTTONS */}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditing ? "Save Changes" : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
}
