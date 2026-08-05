import { UploadedMedia } from "@/lib/mediaService";

export interface ProductMedia {
  url: string;
  publicId: string;
  alt: string;
  isCover: boolean;
  order: number;
}

export function buildProductMedia(
  uploaded: UploadedMedia,
  alt: string,
): ProductMedia[] {
  return [
    {
      url: uploaded.url,
      publicId: uploaded.publicId,
      alt,
      isCover: true,
      order: 0,
    },
  ];
}