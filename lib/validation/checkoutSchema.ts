import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name cannot exceed 50 characters."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),

  address: z
    .string()
    .trim()
    .min(10, "Address must be at least 10 characters."),

  city: z
    .string()
    .trim()
    .min(2, "City is required."),

  state: z
    .string()
    .trim()
    .min(2, "State is required."),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode."),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;