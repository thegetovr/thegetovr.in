"use client";

import { useState } from "react";
import { ArrowLeft, Save, CheckCircle2, ChevronDown } from "lucide-react";

interface ProfileUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
}

interface ProfileEditProps {
  user: ProfileUser | null;
  onCancel: () => void;
  onSaved: (user: ProfileUser) => void;
}

export default function ProfileEdit({
  user,
  onCancel,
  onSaved,
}: ProfileEditProps) {
  const [firstName, setFirstName] = useState(user?.firstName ?? "");

  const [lastName, setLastName] = useState(user?.lastName ?? "");

  const [phone, setPhone] = useState(user?.phone ?? "");

  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ?? "");

  const [gender, setGender] = useState(user?.gender ?? "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // =====================================================
    // BASIC VALIDATION
    // =====================================================

    if (!firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    // =====================================================
    // PHONE VALIDATION
    // =====================================================

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone,
          dateOfBirth,
          gender,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error("PROFILE API RESPONSE:", text);

        setError(
          `Profile API error (${response.status}). Please check the API route.`,
        );

        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to update profile.");

        return;
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      setSuccess(data.message || "Profile updated successfully.");

      setTimeout(() => {
        onSaved(data.user);
      }, 1000);
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 md:p-7">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-serif text-2xl text-black">Edit Profile</h2>

          <div className="mt-2 h-[2px] w-8 bg-[#b7965d]" />

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Update your personal information.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit sm:py-2.5"
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
          Back
        </button>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
        <div className="grid min-w-0 gap-4 sm:gap-5 md:grid-cols-2">
          {/* FIRST NAME */}

          <FormField
            label="First Name"
            value={firstName}
            onChange={setFirstName}
            placeholder="First Name"
            autoComplete="given-name"
          />

          {/* LAST NAME */}

          <FormField
            label="Last Name"
            value={lastName}
            onChange={setLastName}
            placeholder="Last Name"
            autoComplete="family-name"
          />

          {/* EMAIL */}

          <div className="min-w-0">
            <label className="mb-2 block text-xs font-medium text-zinc-700">
              Email Address
            </label>

            <input
              type="email"
              value={user?.email ?? ""}
              disabled
              autoComplete="email"
              className="h-12 w-full min-w-0 rounded-md border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500 outline-none sm:px-4"
            />

            <p className="mt-1.5 text-[11px] leading-4 text-zinc-400">
              Email is linked to your account and cannot be changed here.
            </p>
          </div>

          {/* PHONE */}

          <div className="min-w-0">
            <label className="mb-2 block text-xs font-medium text-zinc-700">
              Phone Number
            </label>

            <div className="flex min-w-0">
              <div className="flex h-12 shrink-0 items-center rounded-l-md border border-r-0 border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500 sm:px-4">
                +91
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(event) => {
                  const value = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  setPhone(value);

                  if (value.length === 10) {
                    setError("");
                  }
                }}
                placeholder="10-digit mobile number"
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel-national"
                className="h-12 min-w-0 flex-1 rounded-r-md border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-black sm:px-4"
              />
            </div>

            {phone.length > 0 && phone.length < 10 && (
              <p className="mt-1.5 text-xs text-red-500">
                Phone number must be exactly 10 digits.
              </p>
            )}
          </div>

          {/* DATE OF BIRTH */}

          <div className="min-w-0">
            <label className="mb-2 block text-xs font-medium text-zinc-700">
              Date of Birth
            </label>

            <input
              type="date"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
              className="h-12 w-full min-w-0 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-black sm:px-4"
            />
          </div>

          {/* GENDER */}

          <div className="min-w-0">
            <label className="mb-2 block text-xs font-medium text-zinc-700">
              Gender
            </label>

            <div className="relative">
              <select
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                className="h-12 w-full min-w-0 appearance-none rounded-md border border-zinc-200 bg-white px-3 pr-10 text-sm text-zinc-800 outline-none transition focus:border-black sm:px-4 sm:pr-10"
              >
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>

                <option value="Prefer not to say">Prefer not to say</option>
              </select>

              <ChevronDown
                size={16}
                strokeWidth={1.7}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 sm:right-4"
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            SUCCESS MESSAGE
        ===================================================== */}

        {success && (
          <div className="mt-5 flex min-w-0 items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-3 py-3 text-sm text-green-700 sm:px-4">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />

            <span className="min-w-0 break-words">{success}</span>
          </div>
        )}

        {/* =====================================================
            ERROR MESSAGE
        ===================================================== */}

        {error && (
          <div className="mt-5 min-w-0 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm leading-5 text-red-600 sm:px-4">
            {error}
          </div>
        )}

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
          >
            <Save size={16} strokeWidth={1.8} />

            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </section>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-medium text-zinc-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-12 w-full min-w-0 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-black sm:px-4"
      />
    </div>
  );
}
