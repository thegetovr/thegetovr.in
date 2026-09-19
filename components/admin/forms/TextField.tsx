interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string | number;
  placeholder?: string;
  type?: "text" | "number" | "date";
  min?: number;
  disabled?: boolean;
}

export default function TextField({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  type = "text",
  min,
  disabled = false,
}: TextFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-zinc-300"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        min={min}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-white outline-none transition focus:border-white"
      />
    </div>
  );
}