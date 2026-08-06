import CouponSearch from "./CouponSearch";
import CouponStatusFilter from "./CouponStatusFilter";
import CouponTypeFilter from "./CouponTypeFilter";

type CouponToolbarProps = {
  search?: string;
  status?: string;
  type?: string;
};

export default function CouponToolbar({
  search = "",
  status = "",
  type = "",
}: CouponToolbarProps) {
  return (
    <form className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-sm">
        <CouponSearch defaultValue={search} />
      </div>

      <div className="flex gap-3">
        <CouponTypeFilter defaultValue={type} />

        <CouponStatusFilter defaultValue={status} />
      </div>
    </form>
  );
}
