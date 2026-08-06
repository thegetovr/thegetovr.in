type CouponTypeFilterProps = {
  defaultValue?: string;
};

export default function CouponTypeFilter({
  defaultValue = "",
}: CouponTypeFilterProps) {
  return (
    <select
      name="type"
      defaultValue={defaultValue}
      className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white outline-none focus:border-zinc-500"
    >
      <option value="">All Types</option>
      <option value="percentage">Percentage</option>
      <option value="flat">Flat</option>
    </select>
  );
}