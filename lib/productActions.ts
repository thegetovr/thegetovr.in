"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { productSchema } from "@/lib/validation/product";

async function parseProductForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    sku: formData.get("sku"),
    category: formData.get("category"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    status: formData.get("status"),
  });
}

export async function createProduct(
  formData: FormData,
) {
  const parsed = await parseProductForm(formData);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await connectToDatabase();

  const existingProduct = await Product.findOne({
    sku: parsed.data.sku,
  });

  if (existingProduct) {
    console.error("A product with this SKU already exists.");
    return;
  }

  const product = await Product.create(parsed.data);

  revalidatePath("/admin/products");

  redirect(`/admin/products/${product.id}`);
}

export async function updateProduct(
  productId: string,
  formData: FormData,
) {
  const parsed = await parseProductForm(formData);

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