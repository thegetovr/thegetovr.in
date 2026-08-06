import CustomerSearch from "./CustomerSearch";
import CustomerStatusFilter from "./CustomerStatusFilter";

type CustomerToolbarProps = {
  search?: string;
  status?: string;
};

export default function CustomerToolbar({
  search = "",
  status = "",
}: CustomerToolbarProps) {
  return (
    <form className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-sm">
        <CustomerSearch defaultValue={search} />
      </div>

      <CustomerStatusFilter defaultValue={status} />
    </form>
  );
}