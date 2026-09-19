import sharp from "sharp";

import cloudinary from "@/lib/cloudinary";

export interface UploadedMedia {
  url: string;
  publicId: string;
}

export async function uploadFile(
  file: File,
  folder: string,
): Promise<UploadedMedia> {
  const arrayBuffer = await file.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);

  // Optimize images before sending them to Cloudinary.
  // This keeps large CMS uploads under Cloudinary's 10 MB limit.
  const optimizedBuffer = await sharp(inputBuffer)
    .rotate()
    .resize({
      width: 2400,
      height: 2400,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      effort: 4,
    })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        format: "webp",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary upload returned no result"));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    uploadStream.end(optimizedBuffer);
  });
}

export async function deleteMedia(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}