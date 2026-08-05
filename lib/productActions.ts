"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { productSchema } from "@/lib/validation/product";
import { deleteMedia, uploadFile } from "@/lib/mediaService";
import { buildProductMedia } from "@/lib/productMedia";

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

export async function createProduct(formData: FormData) {
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

  const files = formData.getAll("media");

  const media: {
    url: string;
    publicId: string;
    alt: string;
    isCover: boolean;
    order: number;
  }[] = [];
  for (const [index, file] of files.entries()) {
    if (!(file instanceof File) || file.size === 0) {
      continue;
    }

    const uploaded = await uploadFile(file, "products");

    const uploadedMedia = buildProductMedia(uploaded, parsed.data.name)[0];

    media.push({
      ...uploadedMedia,
      isCover: index === 0,
      order: index,
    });
  }

  const product = await Product.create({
    ...parsed.data,
    media,
  });

  revalidatePath("/admin/products");

  redirect(`/admin/products/${product.id}`);
}

export async function updateProduct(productId: string, formData: FormData) {
  const parsed = await parseProductForm(formData);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await connectToDatabase();

  const product = await Product.findById(productId);

  if (!product) {
    console.error("Product not found.");
    return;
  }

  const existingProduct = await Product.findOne({
    sku: parsed.data.sku,
    _id: { $ne: productId },
  });

  if (existingProduct) {
    console.error("A product with this SKU already exists.");
    return;
  }

  const media = [...(product.media ?? [])];

  const files = formData.getAll("media");

  let nextOrder = media.length;

  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) {
      continue;
    }

    const uploaded = await uploadFile(file, "products");

    const uploadedMedia = buildProductMedia(uploaded, parsed.data.name)[0];

    media.push({
      ...uploadedMedia,
      isCover: media.length === 0,
      order: nextOrder++,
    });
  }

  await Product.findByIdAndUpdate(productId, {
    ...parsed.data,
    media,
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);

  redirect(`/admin/products/${productId}`);
}
export async function deleteProduct(productId: string) {
  await connectToDatabase();

  const product = await Product.findById(productId);

  if (!product) {
    console.error("Product not found.");
    return;
  }

  if (product.media?.length) {
    for (const media of product.media) {
      if (media.publicId) {
        await deleteMedia(media.publicId);
      }
    }
  }

  await Product.findByIdAndDelete(productId);

  revalidatePath("/admin/products");

  redirect("/admin/products");
}
