import { z } from "zod";

const homeMediaSchema = z.object({
  url: z.string().trim().min(1),
  publicId: z.string().trim().min(1),
  alt: z.string().trim().default(""),
});

const homeTrustPointSchema = z.object({
  icon: z.string().trim().min(1, "Icon is required"),
  title: z.string().trim().min(1, "Trust point title is required"),
  subtitle: z.string().trim().min(1, "Trust point subtitle is required"),
});

export const homeHeroSchema = z.object({
  eyebrow: z.string().trim().min(1, "Eyebrow is required"),
  heading: z.string().trim().min(1, "Heading is required"),
  description: z.string().trim().min(1, "Description is required"),

  primaryCtaLabel: z
    .string()
    .trim()
    .min(1, "Primary button label is required"),

  primaryCtaLink: z
    .string()
    .trim()
    .min(1, "Primary button link is required"),

  secondaryCtaLabel: z
    .string()
    .trim()
    .min(1, "Secondary button label is required"),

  secondaryCtaLink: z
    .string()
    .trim()
    .min(1, "Secondary button link is required"),

  trustPoints: z
    .array(homeTrustPointSchema)
    .length(4, "Exactly four trust points are required"),
});

export const homeMediaFormSchema = z.object({
  alt: z.string().trim().default(""),
});

export type HomeHeroInput = z.infer<typeof homeHeroSchema>;
export type HomeMediaInput = z.infer<typeof homeMediaFormSchema>;