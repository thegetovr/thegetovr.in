"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/Category";
import { categorySchema } from "@/lib/validation/category";

async function parseCategoryForm(formData: FormData) {
  return categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    status: formData.get("status"),
  });
}

export async function createCategory(
  formData: FormData,
) {
  const parsed = await parseCategoryForm(formData);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await connectToDatabase();

  const existingCategory = await Category.findOne({
    slug: parsed.data.slug,
  });

  if (existingCategory) {
    console.error("A category with this slug already exists.");
    return;
  }

  const category = await Category.create(parsed.data);

  revalidatePath("/admin/categories");

  redirect(`/admin/categories/${category.id}`);
}

export async function updateCategory(
  categoryId: string,
  formData: FormData,
) {
  const parsed = await parseCategoryForm(formData);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await connectToDatabase();

  const existingCategory = await Category.findOne({
    slug: parsed.data.slug,
    _id: { $ne: categoryId },
  });

  if (existingCategory) {
    console.error("A category with this slug already exists.");
    return;
  }

  await Category.findByIdAndUpdate(categoryId, parsed.data);

  revalidatePath("/admin/categories");
  revalidatePath(`/admin/categories/${categoryId}`);

  redirect(`/admin/categories/${categoryId}`);
}

export async function deleteCategory(
  categoryId: string,
) {
  await connectToDatabase();

  await Category.findByIdAndDelete(categoryId);

  revalidatePath("/admin/categories");

  redirect("/admin/categories");
}