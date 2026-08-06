type CustomerSearchProps = {
  defaultValue?: string;
};

export default function CustomerSearch({
  defaultValue = "",
}: CustomerSearchProps) {
  return (
    <input
      type="search"
      name="search"
      defaultValue={defaultValue}
      placeholder="Search customers..."
      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
    />
  );
}