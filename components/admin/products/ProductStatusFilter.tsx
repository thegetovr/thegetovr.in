import { ProductStatus } from "@/types/product";

interface ProductStatusFilterProps {
  defaultValue?: ProductStatus | "";
}

const PRODUCT_STATUSES: {
  value: ProductStatus;
  label: string;
}[] = [
  {
    value: "active",
    label: "Live",
  },
  {
    value: "draft",
    label: "Hidden",
  },
  {
    value: "archived",
    label: "Archived",
  },
];

export default function ProductStatusFilter({
  defaultValue = "",
}: ProductStatusFilterProps) {
  return (
    <select
      name="status"
      defaultValue={defaultValue}
      className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-zinc-700 focus:outline-none"
    >
      <option value="">All Statuses</option>

      {PRODUCT_STATUSES.map((status) => (
        <option
          key={status.value}
          value={status.value}
        >
          {status.label}
        </option>
      ))}
    </select>
  );
}