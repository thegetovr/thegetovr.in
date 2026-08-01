interface ProductSearchProps {
  defaultValue?: string;
}

export default function ProductSearch({
  defaultValue = "",
}: ProductSearchProps) {
  return (
    <div className="w-full max-w-sm">
      <input
        type="search"
        name="search"
        defaultValue={defaultValue}
        placeholder="Search products..."
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none"
      />
    </div>
  );
}