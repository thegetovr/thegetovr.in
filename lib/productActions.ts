"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { productSchema } from "@/lib/validation/product";
import { deleteMedia, uploadFile } from "@/lib/mediaService";

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

  const image = formData.get("media");

  let media: {
    url: string;
    publicId: string;
    alt: string;
    isCover: boolean;
    order: number;
  }[] = [];

  if (image instanceof File && image.size > 0) {
    console.log("Image received:", {
      name: image.name,
      size: image.size,
      type: image.type,
    });

    const uploaded = await uploadFile(image, "products");

    console.log("Cloudinary upload result:", uploaded);

    media = [
      {
        url: uploaded.url,
        publicId: uploaded.publicId,
        alt: parsed.data.name,
        isCover: true,
        order: 0,
      },
    ];
  }

  console.log("Media to save:", media);

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

  let media = product.media ?? [];

  const image = formData.get("media");

  if (image instanceof File && image.size > 0) {
    const uploaded = await uploadFile(image, "products");

    const newMedia = [
      {
        url: uploaded.url,
        publicId: uploaded.publicId,
        alt: parsed.data.name,
        isCover: true,
        order: 0,
      },
    ];

    if (media.length > 0 && media[0].publicId) {
      await deleteMedia(media[0].publicId);
    }

    media = newMedia;
  }

  await Product.findByIdAndUpdate(productId, {
    ...parsed.data,
    media,
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);

  redirect(`/admin/products/${productId}`);
}
export async function deleteProduct(
  productId: string,
) {
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
