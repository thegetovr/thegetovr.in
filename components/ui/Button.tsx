"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-(--color-text-primary) text-(--color-white) border border-(--color-text-primary) hover:bg-(--color-text-secondary)",

    secondary:
      "bg-(--color-surface-muted) text-(--color-text-primary) border border-(--color-border) hover:bg-(--color-surface)",

    outline:
      "bg-transparent text-(--color-text-primary) border border-(--color-border) hover:border-(--color-text-primary) hover:bg-(--color-surface-muted)",

    danger:
      "bg-(--color-error) text-(--color-white) border border-(--color-error) hover:opacity-90",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-(--radius-sm)
        px-5
        py-3
        font-medium
        transition-colors
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${fullWidth ? "w-full" : ""}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
}