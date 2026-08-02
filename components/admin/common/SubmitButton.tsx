"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
  variant?: "primary" | "danger";
}

export default function SubmitButton({
  label,
  pendingLabel,
  variant = "primary",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const baseClasses =
    "rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses =
    variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-500"
      : "bg-white text-black hover:bg-zinc-200";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${baseClasses} ${variantClasses}`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}