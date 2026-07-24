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
      <label className="block text-sm font-medium text-zinc-200">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        {...registration}
        {...props}
        className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 transition-all outline-none
        ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-700 focus:border-white"
        }
        ${className}`}
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}