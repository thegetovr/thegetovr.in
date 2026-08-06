type CouponStatusFilterProps = {
  defaultValue?: string;
};

export default function CouponStatusFilter({
  defaultValue = "",
}: CouponStatusFilterProps) {
  return (
    <select
      name="status"
      defaultValue={defaultValue}
      className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white outline-none focus:border-zinc-500"
    >
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
}