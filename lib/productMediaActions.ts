"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { deleteMedia } from "@/lib/mediaService";

export async function setCoverImage(
  productId: string,
  publicId: string,
) {
  await connectToDatabase();

  const product = await Product.findById(productId);

  if (!product) {
    return;
  }

  product.media = product.media.map(
    (image: typeof product.media[number]) => ({
      ...image.toObject(),
      isCover: image.publicId === publicId,
    }),
  );

  await product.save();

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath(`/admin/products/${productId}/edit`);
  revalidatePath("/admin/products");
}

export async function deleteProductImage(
  productId: string,
  publicId: string,
) {
  await connectToDatabase();

  const product = await Product.findById(productId);

  if (!product) {
    return;
  }

  const imageToDelete = product.media.find(
    (image: typeof product.media[number]) =>
      image.publicId === publicId,
  );

  if (!imageToDelete) {
    return;
  }

  await deleteMedia(publicId);

  product.media = product.media.filter(
    (image: typeof product.media[number]) =>
      image.publicId !== publicId,
  );

  if (
    product.media.length > 0 &&
    !product.media.some(
      (image: typeof product.media[number]) => image.isCover,
    )
  ) {
    product.media[0].isCover = true;
  }

  await product.save();

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath(`/admin/products/${productId}/edit`);
  revalidatePath("/admin/products");
}