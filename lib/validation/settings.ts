import { z } from "zod";

export const settingsSchema = z.object({
  storeName: z.string().trim().min(1, "Store name is required"),

  supportEmail: z
    .string()
    .trim()
    .email("Please enter a valid support email"),

  phone: z.string().trim().min(1, "Phone number is required"),

  address: z.string().trim().min(1, "Address is required"),

  currency: z.string().trim().min(1, "Currency is required"),

  taxRate: z.coerce.number().min(0, "Tax rate cannot be negative"),

  shippingCharge: z.coerce
    .number()
    .min(0, "Shipping charge cannot be negative"),

  freeShippingThreshold: z.coerce
    .number()
    .min(0, "Free shipping threshold cannot be negative"),

  defaultOrderStatus: z
    .string()
    .trim()
    .min(1, "Default order status is required"),
});