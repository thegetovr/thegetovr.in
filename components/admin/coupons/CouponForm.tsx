import SelectField from "@/components/admin/forms/SelectField";
import TextField from "@/components/admin/forms/TextField";
import SubmitButton from "@/components/admin/common/SubmitButton";

import { createCoupon, updateCoupon } from "@/lib/couponActions";
import { Coupon } from "@/types/coupon";

interface CouponFormProps {
  mode: "create" | "edit";
  coupon?: Coupon;
}

export default function CouponForm({
  mode,
  coupon,
}: CouponFormProps) {
  const action =
    mode === "create"
      ? createCoupon
      : updateCoupon.bind(null, coupon!.id);

  return (
    <form
      action={action}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
    >
      <h2 className="text-xl font-semibold text-white">
        Coupon Information
      </h2>

      <div className="mt-6 space-y-6">
        <TextField
          id="code"
          name="code"
          label="Coupon Code"
          defaultValue={coupon?.code ?? ""}
          placeholder="SAVE20"
        />

        <TextField
          id="description"
          name="description"
          label="Description"
          defaultValue={coupon?.description ?? ""}
          placeholder="Festival Offer"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <SelectField
            id="type"
            name="type"
            label="Discount Type"
            defaultValue={coupon?.type ?? "percentage"}
            options={[
              {
                value: "percentage",
                label: "Percentage",
              },
              {
                value: "flat",
                label: "Flat Amount",
              },
            ]}
          />

          <TextField
            id="value"
            name="value"
            label="Discount Value"
            type="number"
            min={0}
            defaultValue={coupon?.value ?? ""}
            placeholder="10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="minimumOrderValue"
            name="minimumOrderValue"
            label="Minimum Order Value"
            type="number"
            min={0}
            defaultValue={coupon?.minimumOrderValue ?? ""}
            placeholder="0"
          />

          <TextField
            id="usageLimit"
            name="usageLimit"
            label="Usage Limit"
            type="number"
            min={0}
            defaultValue={coupon?.usageLimit ?? ""}
            placeholder="100"
          />
        </div>

        <TextField
          id="expiresAt"
          name="expiresAt"
          label="Expiry Date"
          type="date"
          defaultValue={
            coupon?.expiresAt
              ? coupon.expiresAt.slice(0, 10)
              : ""
          }
        />

        <SelectField
          id="status"
          name="status"
          label="Status"
          defaultValue={coupon?.status ?? "active"}
          options={[
            {
              value: "active",
              label: "Active",
            },
            {
              value: "inactive",
              label: "Inactive",
            },
          ]}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <SubmitButton
          label={mode === "create" ? "Create Coupon" : "Save Changes"}
          pendingLabel={
            mode === "create"
              ? "Creating..."
              : "Saving..."
          }
        />
      </div>
    </form>
  );
}