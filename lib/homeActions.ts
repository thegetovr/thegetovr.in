"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/mongodb";
import HomeContent from "@/models/HomeContent";
import { uploadFile } from "@/lib/mediaService";
import { homeHeroSchema } from "@/lib/validation/home";

async function parseHeroForm(formData: FormData) {
  const trustPoints = [0, 1, 2, 3].map((index) => ({
    icon: String(formData.get(`trustPoint-${index}-icon`) ?? ""),
    title: String(formData.get(`trustPoint-${index}-title`) ?? ""),
    subtitle: String(
      formData.get(`trustPoint-${index}-subtitle`) ?? "",
    ),
  }));

  return homeHeroSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    heading: formData.get("heading"),
    description: formData.get("description"),
    primaryCtaLabel: formData.get("primaryCtaLabel"),
    primaryCtaLink: formData.get("primaryCtaLink"),
    secondaryCtaLabel: formData.get("secondaryCtaLabel"),
    secondaryCtaLink: formData.get("secondaryCtaLink"),
    trustPoints,
  });
}

export async function saveHomeHero(formData: FormData) {
  const parsed = await parseHeroForm(formData);

  if (!parsed.success) {
    console.error("HOME HERO VALIDATION ERROR:", parsed.error.flatten().fieldErrors);
    throw new Error("Home Hero validation failed");
  }

  await connectToDatabase();

  const existingHome = await HomeContent.findOne();

  let heroImage = existingHome?.hero?.image ?? null;

  const imageFile = formData.get("heroImage");

  if (imageFile instanceof File && imageFile.size > 0) {
    const uploaded = await uploadFile(imageFile, "home/hero");

    heroImage = {
      url: uploaded.url,
      publicId: uploaded.publicId,
      alt: String(formData.get("heroImageAlt") ?? ""),
    };
  }

  const hero = {
    ...parsed.data,
    image: heroImage,
  };

  if (existingHome) {
    await HomeContent.findByIdAndUpdate(existingHome._id, {
      hero,
    });
  } else {
    console.error(
      "Home content does not exist yet. Initial Home content must be created before saving the Hero.",
    );
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin/home");
}



