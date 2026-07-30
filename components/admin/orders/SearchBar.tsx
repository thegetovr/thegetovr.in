type SearchBarProps = {
  defaultValue?: string;
};

export default function SearchBar({
  defaultValue = "",
}: SearchBarProps) {
  return (
    <form method="GET" className="w-full max-w-md">
      <label htmlFor="search" className="sr-only">
        Search orders
      </label>

      <input
        id="search"
        name="search"
        type="search"
        defaultValue={defaultValue}
        placeholder="Search by order number, customer or email..."
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
      />
    </form>
  );
}