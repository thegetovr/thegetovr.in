import SettingsForm from "@/components/admin/settings/SettingsForm";
import { getSettings } from "@/lib/settingsService";

export const metadata = {
  title: "Settings | The Getovr Admin",
};

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your store configuration and business settings.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}