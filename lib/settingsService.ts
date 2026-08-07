import { connectToDatabase } from "@/lib/mongodb";
import SettingsModel from "@/models/Settings";
import { Settings } from "@/types/settings";

export async function getSettings(): Promise<Settings | null> {
  await connectToDatabase();

  const settings = await SettingsModel.findOne().lean();

  if (!settings) {
    return null;
  }

  return {
    id: String(settings._id),
    storeName: settings.storeName,
    supportEmail: settings.supportEmail,
    phone: settings.phone,
    address: settings.address,
    currency: settings.currency,
    taxRate: settings.taxRate,
    shippingCharge: settings.shippingCharge,
    freeShippingThreshold: settings.freeShippingThreshold,
    logo: settings.logo ?? "",
    favicon: settings.favicon ?? "",
    defaultOrderStatus: settings.defaultOrderStatus,
  };
}
