import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  required?: boolean;
}

export default function FormField({
  label,
  error,
  registration,
  required = false,
  className = "",
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-(--color-text-primary)">
        {label}
        {required && <span className="ml-1 text-(--color-error)">*</span>}
      </label>

      <input
        {...registration}
        {...props}
        className={`w-full rounded-sm border bg-(--color-input-background) px-4 py-3 text-(--color-text-primary) placeholder:text-(--color-input-placeholder) outline-none transition-colors
        ${
          error
            ? "border-(--color-error) focus:border-(--color-error)"
            : "border-(--color-input-border) focus:border-(--color-input-focus)"
        }
        disabled:cursor-not-allowed
        disabled:bg-(--color-surface-muted)
        disabled:text-(--color-text-muted)
        ${className}`}
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
