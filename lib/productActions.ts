"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { productSchema } from "@/lib/validation/product";

export async function updateProduct(
  productId: string,
  formData: FormData,
) {
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    sku: formData.get("sku"),
    category: formData.get("category"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await connectToDatabase();

  const existingProduct = await Product.findOne({
    sku: parsed.data.sku,
    _id: { $ne: productId },
  });

  if (existingProduct) {
    console.error("A product with this SKU already exists.");
    return;
  }

  await Product.findByIdAndUpdate(productId, parsed.data);

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);

  redirect(`/admin/products/${productId}`);
}

export async function deleteProduct(
  productId: string,
) {
  await connectToDatabase();

  await Product.findByIdAndDelete(productId);

  revalidatePath("/admin/products");

  redirect("/admin/products");
}