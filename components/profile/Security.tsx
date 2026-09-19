"use client";

import {
  ShieldCheck,
  LockKeyhole,
  Mail,
  Smartphone,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProfileUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface SecurityProps {
  user: ProfileUser | null;
}

export default function Security({ user }: SecurityProps) {
  return (
    <motion.div
      className="min-w-0 space-y-5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* =====================================================
          CHANGE PASSWORD
      ===================================================== */}

      <ChangePasswordCard />

      {/* =====================================================
          ACCOUNT VERIFICATION
      ===================================================== */}

      <section className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 md:p-7">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f4ecdf]">
            <ShieldCheck size={20} strokeWidth={1.6} />
          </div>

          <div className="min-w-0">
            <h2 className="font-serif text-2xl text-black">
              Account Verification
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Your account verification status.
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200">
          <VerificationRow
            icon={Mail}
            title="Email Address"
            value={user?.email || "Not available"}
            verified
          />

          <VerificationRow
            icon={Smartphone}
            title="Phone Number"
            value={user?.phone ? `+91 ${user.phone}` : "Not available"}
            verified
            last
          />
        </div>
      </section>

      {/* =====================================================
          DANGER ZONE
      ===================================================== */}

      <DeleteAccountSection user={user} />
    </motion.div>
  );
}

/* =========================================================
   CHANGE PASSWORD CARD
========================================================= */

function ChangePasswordCard() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordLengthValid = newPassword.length >= 8;
  const uppercaseValid = /[A-Z]/.test(newPassword);
  const numberValid = /\d/.test(newPassword);

  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (!uppercaseValid) {
      setError("New password must contain at least one uppercase letter.");
      return;
    }

    if (!numberValid) {
      setError("New password must contain at least one number.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to change password.");
        return;
      }

      setSuccess(data.message || "Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
    } catch (error) {
      console.error("CHANGE PASSWORD ERROR:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 md:p-7">
      {/* HEADER */}

      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f4ecdf]">
          <LockKeyhole size={20} strokeWidth={1.6} />
        </div>

        <div className="min-w-0">
          <h2 className="font-serif text-2xl text-black">Security</h2>

          <div className="mt-2 h-[2px] w-8 bg-[#b7965d]" />

          <p className="mt-3 text-xs leading-5 text-zinc-500">
            Manage your password and keep your account secure.
          </p>
        </div>
      </div>

      {/* CHANGE PASSWORD */}

      <div className="mt-7">
        <h3 className="font-serif text-xl text-black">Change Password</h3>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          Use a strong, unique password to protect your account.
        </p>
      </div>

      <div className="mt-5 grid min-w-0 gap-4">
        {/* CURRENT */}

        <PasswordField
          label="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Enter current password"
          visible={showCurrent}
          onToggle={() => setShowCurrent((value) => !value)}
          autoComplete="current-password"
        />

        {/* NEW + CONFIRM */}

        <div className="grid min-w-0 gap-4 md:grid-cols-2">
          <PasswordField
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Enter new password"
            visible={showNew}
            onToggle={() => setShowNew((value) => !value)}
            autoComplete="new-password"
          />

          <PasswordField
            label="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm new password"
            visible={showConfirm}
            onToggle={() => setShowConfirm((value) => !value)}
            autoComplete="new-password"
          />
        </div>

        {/* REQUIREMENTS */}

        <div className="rounded-lg bg-[#fcfbf9] px-4 py-3">
          <p className="text-xs font-medium text-zinc-700">
            Password requirements
          </p>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            <Requirement
              valid={passwordLengthValid}
              text="At least 8 characters"
            />

            <Requirement valid={uppercaseValid} text="One uppercase letter" />

            <Requirement valid={numberValid} text="One number" />
          </div>
        </div>

        {confirmPassword.length > 0 && (
          <p
            className={`text-xs ${
              passwordsMatch ? "text-green-600" : "text-red-500"
            }`}
          >
            {passwordsMatch ? "Passwords match." : "Passwords do not match."}
          </p>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="flex min-w-0 items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-3 py-3 text-sm text-green-700 sm:px-4">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />

            <span className="min-w-0 break-words">{success}</span>
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="min-w-0 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm leading-5 text-red-600 sm:px-4">
            {error}
          </div>
        )}

        {/* BUTTON */}

        <div className="pt-1">
          <button
            type="button"
            onClick={handleChangePassword}
            disabled={saving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
          >
            <LockKeyhole size={16} strokeWidth={1.7} />

            {saving ? "Changing Password..." : "Change Password"}
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DELETE ACCOUNT SECTION
========================================================= */

function DeleteAccountSection({ user }: { user: ProfileUser | null }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async () => {
    setError("");
    setDeleting(true);

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to delete your account.");

        setDeleting(false);
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.error("DELETE ACCOUNT ERROR:", error);

      setError("Something went wrong. Please try again.");

      setDeleting(false);
    }
  };

  return (
    <>
      <section className="min-w-0 overflow-hidden rounded-xl border border-red-200 bg-white p-4 sm:p-5 md:p-7">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
            <AlertTriangle
              size={20}
              strokeWidth={1.6}
              className="text-red-500"
            />
          </div>

          <div className="min-w-0">
            <h2 className="font-serif text-2xl text-black">Danger Zone</h2>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              These actions can permanently affect your account.
            </p>
          </div>
        </div>

        <div className="mt-6 flex min-w-0 flex-col gap-4 rounded-xl border border-red-100 bg-red-50/40 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-black">Delete Account</h3>

            <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-500">
              Permanently delete your account and associated personal
              information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setError("");
              setShowConfirm(true);
            }}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-3 text-xs font-medium text-red-600 transition hover:bg-red-50 sm:w-fit"
          >
            <Trash2 size={15} strokeWidth={1.7} />
            Delete Account
          </button>
        </div>
      </section>

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
              <Trash2 size={20} strokeWidth={1.7} className="text-red-500" />
            </div>

            <h2 className="mt-5 font-serif text-2xl text-black">
              Delete your account?
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              This action is permanent. Your account will be deleted and you
              will be signed out.
            </p>

            {user?.email && (
              <div className="mt-4 rounded-lg bg-[#fcfbf9] px-4 py-3">
                <p className="text-[11px] text-zinc-400">Account</p>

                <p className="mt-1 break-all text-sm font-medium text-zinc-800">
                  {user.email}
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                {error}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!deleting) {
                    setShowConfirm(false);
                    setError("");
                  }
                }}
                disabled={deleting}
                className="rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={15} strokeWidth={1.7} />

                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   PASSWORD FIELD
========================================================= */

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  visible,
  onToggle,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
  autoComplete: string;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-medium text-zinc-700">
        {label}
      </label>

      <div className="relative min-w-0">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-12 w-full min-w-0 rounded-md border border-zinc-200 bg-white px-3 pr-12 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-black sm:px-4 sm:pr-12"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-zinc-400 transition hover:text-black"
        >
          {visible ? (
            <EyeOff size={17} strokeWidth={1.7} />
          ) : (
            <Eye size={17} strokeWidth={1.7} />
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   REQUIREMENT
========================================================= */

function Requirement({ valid, text }: { valid: boolean; text: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] ${
        valid ? "text-green-600" : "text-zinc-400"
      }`}
    >
      <CheckCircle2 size={13} strokeWidth={1.7} />

      {text}
    </span>
  );
}

/* =========================================================
   VERIFICATION ROW
========================================================= */

function VerificationRow({
  icon: Icon,
  title,
  value,
  verified,
  last = false,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  verified: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 items-center gap-3 p-4 sm:p-5 ${
        !last ? "border-b border-zinc-200" : ""
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f6f2]">
        <Icon size={18} strokeWidth={1.6} className="text-zinc-700" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-black">{title}</p>

        <p className="mt-1 truncate text-xs text-zinc-500">{value}</p>
      </div>

      {verified && (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1.5 text-[10px] font-medium text-green-700">
          <CheckCircle2 size={12} strokeWidth={1.8} />

          <span className="hidden xs:inline">Verified</span>

          <span className="xs:hidden">✓</span>
        </span>
      )}
    </div>
  );
}
