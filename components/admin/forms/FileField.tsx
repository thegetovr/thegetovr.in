interface FileFieldProps {
  id: string;
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
}

export default function FileField({
  id,
  name,
  label,
  accept = "image/*",
  multiple = false,
}: FileFieldProps) {
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
        type="file"
        accept={accept}
        multiple={multiple}
        className="mt-2 block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-300 file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-zinc-900 hover:file:bg-zinc-200"
      />
    </div>
  );
}