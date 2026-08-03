interface CategorySearchProps {
  defaultValue?: string;
}

export default function CategorySearch({
  defaultValue = "",
}: CategorySearchProps) {
  return (
    <input
      type="search"
      name="search"
      defaultValue={defaultValue}
      placeholder="Search categories..."
      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white placeholder:text-zinc-500 md:w-64"
    />
  );
}