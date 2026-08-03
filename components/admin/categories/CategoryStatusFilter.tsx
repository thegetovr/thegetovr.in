import { CategoryStatus } from "@/types/category";

interface CategoryStatusFilterProps {
  defaultValue?: CategoryStatus | "";
}

export default function CategoryStatusFilter({
  defaultValue = "",
}: CategoryStatusFilterProps) {
  return (
    <select
      name="status"
      defaultValue={defaultValue}
      className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white"
    >
      <option value="">All Statuses</option>
      <option value="active">Live</option>
      <option value="hidden">Hidden</option>
    </select>
  );
}