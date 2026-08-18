"use client";

import { useEffect, useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";

import AddressForm, { type AddressFormData } from "./addresses/AddressForm";

import AddressCard from "./addresses/AddressCard";

interface Address {
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

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [form, setForm] = useState<AddressFormData>(emptyForm);

  // ID of address currently being edited
  const [editingId, setEditingId] = useState<string | null>(null);

  // =====================================================
  // LOAD ADDRESSES
  // =====================================================

  const loadAddresses = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/addresses", {
        cache: "no-store",
      });

      const data = await response.json();

      if (data.success) {
        setAddresses(data.addresses);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Load addresses error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // =====================================================
  // ADD  ADDRESS
  // =====================================================

  const handleSaveAddress = async (formData: AddressFormData) => {
    setSaving(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        country: formData.country.trim() || "India",
        isDefault: formData.isDefault,
      };

      const url = editingId ? `/api/addresses/${editingId}` : "/api/addresses";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("ADDRESS API RESPONSE:", data);

      if (!response.ok || !data.success) {
        setNotification({
          message: data.message || "Failed to save address",
          type: "error",
        });

        setTimeout(() => {
          setNotification(null);
        }, 2000);

        return;
      }

      // =================================================
      // EDIT EXISTING ADDRESS
      // =================================================

      if (editingId) {
        setAddresses((current) =>
          current.map((address) => {
            if (address._id === editingId) {
              return data.address;
            }

            if (formData.isDefault) {
              return {
                ...address,
                isDefault: false,
              };
            }

            return address;
          }),
        );
      }

      // =================================================
      // ADD NEW ADDRESS
      // =================================================
      else {
        const newAddress = data.address as Address;

        setAddresses((current) => {
          if (newAddress.isDefault) {
            return [
              newAddress,
              ...current.map((address) => ({
                ...address,
                isDefault: false,
              })),
            ];
          }

          return [newAddress, ...current];
        });
      }

      // =================================================
      // SUCCESS NOTIFICATION
      // =================================================

      setNotification({
        message: editingId
          ? "Address updated successfully"
          : "Address saved successfully",
        type: "success",
      });

      setTimeout(() => {
        setNotification(null);
      }, 2000);

      // =================================================
      // RESET FORM
      // =================================================

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Save address error:", error);

      setNotification({
        message: "Something went wrong while saving the address.",
        type: "error",
      });

      setTimeout(() => {
        setNotification(null);
      }, 2000);
    } finally {
      setSaving(false);
    }
  };
  // =====================================================
  // EDIT ADDRESS
  // =====================================================

  const handleEditAddress = (address: Address) => {
    setEditingId(address._id);

    setForm({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      isDefault: address.isDefault,
    });

    setShowForm(true);
  };

  // =====================================================
  // DELETE ADDRESS
  // =====================================================

  const handleDeleteAddress = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setNotification({
          message: data.message || "Failed to delete address",
          type: "error",
        });

        setTimeout(() => {
          setNotification(null);
        }, 2000);

        return;
      }

      setAddresses((current) =>
        current.filter((address) => address._id !== id),
      );

      setNotification({
        message: "Address deleted successfully",
        type: "success",
      });

      setTimeout(() => {
        setNotification(null);
      }, 2000);
    } catch (error) {
      console.error("Delete address error:", error);

      setNotification({
        message: "Something went wrong while deleting the address.",
        type: "error",
      });

      setTimeout(() => {
        setNotification(null);
      }, 2000);
    }
  };

  // =====================================================
  // MAKE DEFAULT
  // =====================================================

  const handleMakeDefault = async (id: string) => {
    try {
      const response = await fetch(`/api/addresses/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setNotification({
          message: data.message || "Failed to update default address",
          type: "error",
        });

        setTimeout(() => {
          setNotification(null);
        }, 2000);

        return;
      }

      setAddresses((current) =>
        current.map((address) => ({
          ...address,
          isDefault: address._id === id,
        })),
      );

      setNotification({
        message: "Default address updated successfully",
        type: "success",
      });

      setTimeout(() => {
        setNotification(null);
      }, 2000);
    } catch (error) {
      console.error("Make default error:", error);

      setNotification({
        message: "Something went wrong while updating the default address.",
        type: "error",
      });

      setTimeout(() => {
        setNotification(null);
      }, 2000);
    }
  };

  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const closeForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <section className="min-w-0 flex-1 bg-white px-8 py-7">
      {notification && (
        <div
          className={`fixed right-6 top-24 z-50 flex items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl ${
            notification.type === "success"
              ? "border-green-500/30 bg-green-50 text-green-700"
              : "border-red-500/30 bg-red-50 text-red-700"
          }`}
        >
          <span className="text-lg">
            {notification.type === "success" ? "✓" : "!"}
          </span>

          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-serif  text-black">My Addresses</h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-lg 
          px-5 py-3 text-sm font-medium text-zinc-900 transition bg-[#eee3d5] hover:bg-[#e6d8c6]"
        >
          <Plus size={18} strokeWidth={1.8} />
          Add New Address
        </button>
      </div>

      {/* =====================================================
          ADD / EDIT ADDRESS FORM
      ===================================================== */}

      {showForm && (
        <div className="mt-7">
          <AddressForm
            initialData={form}
            isEditing={Boolean(editingId)}
            saving={saving}
            onSubmit={handleSaveAddress}
            onCancel={closeForm}
          />
        </div>
      )}

      {/* =====================================================
          ADDRESS LIST
      ===================================================== */}

      <div className="mt-7 space-y-4">
        {loading ? (
          <div className="rounded-xl border border-gray-200 p-8 text-center text-sm text-gray-500">
            Loading your addresses...
          </div>
        ) : !showForm && addresses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Plus size={20} className="text-gray-500" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-black">
              No saved addresses
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add your first delivery address to make checkout faster.
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="mt-5 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Add Address
            </button>
          </div>
        ) : (
          addresses
            .filter((address) => address._id !== editingId)
            .map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onEdit={handleEditAddress}
                onDelete={handleDeleteAddress}
                onMakeDefault={handleMakeDefault}
              />
            ))
        )}
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
