"use client";

import { useTransition } from "react";
import {
  deleteProductImage,
  setCoverImage,
} from "@/lib/productMediaActions";

interface GalleryActionsProps {
  productId: string;
  publicId: string;
  children: (actions: {
    isPending: boolean;
    setCover: () => void;
    deleteImage: () => void;
  }) => React.ReactNode;
}

export default function GalleryActions({
  productId,
  publicId,
  children,
}: GalleryActionsProps) {
  const [isPending, startTransition] = useTransition();

  function setCover() {
    startTransition(async () => {
      await setCoverImage(productId, publicId);
    });
  }

  function deleteImage() {
    startTransition(async () => {
      await deleteProductImage(productId, publicId);
    });
  }

  return children({
    isPending,
    setCover,
    deleteImage,
  });
}