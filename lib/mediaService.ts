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
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    stream.end(buffer);
  });
}

export async function deleteMedia(
  publicId: string,
) {
  return cloudinary.uploader.destroy(publicId);
}