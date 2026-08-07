"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { settingsSchema } from "@/lib/validation/settings";
import { uploadFile } from "@/lib/mediaService";

async function parseSettingsForm(formData: FormData) {
  return settingsSchema.safeParse({
    storeName: formData.get("storeName"),
    supportEmail: formData.get("supportEmail"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    currency: formData.get("currency"),
    taxRate: formData.get("taxRate"),
    shippingCharge: formData.get("shippingCharge"),
    freeShippingThreshold: formData.get("freeShippingThreshold"),
    defaultOrderStatus: formData.get("defaultOrderStatus"),
  });
}

export async function saveSettings(formData: FormData) {
  const parsed = await parseSettingsForm(formData);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await connectToDatabase();

const existingSettings = await Settings.findOne();

let logo = existingSettings?.logo ?? "";
let favicon = existingSettings?.favicon ?? "";

const logoFile = formData.get("logo");
if (logoFile instanceof File && logoFile.size > 0) {
  const uploaded = await uploadFile(logoFile, "settings");
  logo = uploaded.url;
}

const faviconFile = formData.get("favicon");
if (faviconFile instanceof File && faviconFile.size > 0) {
  const uploaded = await uploadFile(faviconFile, "settings");
  favicon = uploaded.url;
}

const data = {
  ...parsed.data,
  logo,
  favicon,
};

if (existingSettings) {
  await Settings.findByIdAndUpdate(existingSettings._id, data);
} else {
  await Settings.create(data);
}

  revalidatePath("/admin/settings");

  redirect("/admin/settings");
}