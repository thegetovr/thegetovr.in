"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/mongodb";
import HomeContent from "@/models/HomeContent";
import { uploadFile } from "@/lib/mediaService";
import { homeCategoriesSchema } from "@/lib/validation/homeCategories";

export async function saveHomeCategories(formData: FormData) {
  const categoryIndexes = Array.from(
    new Set(
      Array.from(formData.keys())
        .map((key) => {
          const match = key.match(/^category-(\d+)-id$/);
          return match ? Number(match[1]) : null;
        })
        .filter((index): index is number => index !== null),
    ),
  ).sort((a, b) => a - b);

  const categories = categoryIndexes.map((index) => ({
    id: String(formData.get(`category-${index}-id`) ?? ""),
    title: String(formData.get(`category-${index}-title`) ?? ""),
    subtitle: String(
      formData.get(`category-${index}-subtitle`) ?? "",
    ),
    link: String(formData.get(`category-${index}-link`) ?? ""),
    order: Number(formData.get(`category-${index}-order`) ?? 0),
    enabled: formData.get(`category-${index}-enabled`) === "on",
  }));

  const parsed = homeCategoriesSchema.safeParse(categories);

  if (!parsed.success) {
    console.error(
      "HOME CATEGORIES VALIDATION ERROR:",
      parsed.error.flatten(),
    );
    return;
  }

  await connectToDatabase();

  const existingHome = await HomeContent.findOne();

  if (!existingHome) {
    console.error("Home content does not exist.");
    return;
  }

  const updatedCategories = [];

  for (const category of parsed.data) {
    const existingCategory = existingHome.categories.find(
      (item: { id: string }) => item.id === category.id,
    );

    let image = existingCategory?.image ?? null;

    const imageFile = formData.get(
      `category-${categoryIndexes[parsed.data.indexOf(category)]}-image`,
    );

    if (imageFile instanceof File && imageFile.size > 0) {
      const uploaded = await uploadFile(
        imageFile,
        `home/categories/${category.id}`,
      );

      image = {
        url: uploaded.url,
        publicId: uploaded.publicId,
        alt: category.title,
      };
    }

    updatedCategories.push({
      ...category,
      image,
    });
  }

  await HomeContent.findByIdAndUpdate(existingHome._id, {
    categories: updatedCategories,
  });

  revalidatePath("/");
  revalidatePath("/admin/home");
}