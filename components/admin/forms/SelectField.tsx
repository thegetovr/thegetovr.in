interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  options: SelectOption[];
}

export default function SelectField({
  id,
  name,
  label,
  defaultValue,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-zinc-300"
      >
        {label}
      </label>

      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-white outline-none transition focus:border-white"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}