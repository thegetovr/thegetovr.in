import SubmitButton from "@/components/admin/common/SubmitButton";
import SelectField from "@/components/admin/forms/SelectField";
import TextField from "@/components/admin/forms/TextField";
import { saveSettings } from "@/lib/settingsActions";
import { Settings } from "@/types/settings";
import FileField from "@/components/admin/forms/FileField";
import Image from "next/image";

interface SettingsFormProps {
  settings: Settings | null;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  return (
    <form
      action={saveSettings}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-white">Store Settings</h2>

          <div className="mt-6 space-y-6">
            <TextField
              id="storeName"
              name="storeName"
              label="Store Name"
              defaultValue={settings?.storeName ?? ""}
            />

            <TextField
              id="supportEmail"
              name="supportEmail"
              label="Support Email"
              defaultValue={settings?.supportEmail ?? ""}
            />

            <TextField
              id="phone"
              name="phone"
              label="Phone"
              defaultValue={settings?.phone ?? ""}
            />

            <TextField
              id="address"
              name="address"
              label="Address"
              defaultValue={settings?.address ?? ""}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">
            Business Settings
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TextField
              id="taxRate"
              name="taxRate"
              label="Tax Rate (%)"
              type="number"
              min={0}
              defaultValue={settings?.taxRate ?? 0}
            />

            <TextField
              id="shippingCharge"
              name="shippingCharge"
              label="Shipping Charge"
              type="number"
              min={0}
              defaultValue={settings?.shippingCharge ?? 0}
            />

            <TextField
              id="freeShippingThreshold"
              name="freeShippingThreshold"
              label="Free Shipping Threshold"
              type="number"
              min={0}
              defaultValue={settings?.freeShippingThreshold ?? 0}
            />

            <SelectField
              id="currency"
              name="currency"
              label="Currency"
              defaultValue={settings?.currency ?? "INR"}
              options={[{ value: "INR", label: "Indian Rupee (₹)" }]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Order Settings</h2>

          <div className="mt-6">
            <SelectField
              id="defaultOrderStatus"
              name="defaultOrderStatus"
              label="Default Order Status"
              defaultValue={settings?.defaultOrderStatus ?? "pending"}
              options={[
                { value: "pending", label: "Pending" },
                { value: "confirmed", label: "Confirmed" },
                { value: "processing", label: "Processing" },
                { value: "shipped", label: "Shipped" },
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Brand Settings</h2>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-300">
                Current Logo
              </h3>

              <div className="flex h-40 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                {settings?.logo ? (
                  <Image
                    src={settings.logo}
                    alt="Store Logo"
                    width={240}
                    height={120}
                    className="max-h-28 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-zinc-500">
                    No logo uploaded
                  </span>
                )}
              </div>

              <FileField id="logo" name="logo" label="Store Logo" />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-300">
                Current Favicon
              </h3>

              <div className="flex h-40 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                {settings?.favicon ? (
                  <Image
                    src={settings.favicon}
                    alt="Favicon"
                    width={64}
                    height={64}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <span className="text-sm text-zinc-500">
                    No favicon uploaded
                  </span>
                )}
              </div>

              <FileField id="favicon" name="favicon" label="Favicon" />
            </div>
          </div>
        </section>
        <div className="flex justify-end">
          <SubmitButton label="Save Settings" pendingLabel="Saving..." />
        </div>
      </div>
    </form>
  );
}
