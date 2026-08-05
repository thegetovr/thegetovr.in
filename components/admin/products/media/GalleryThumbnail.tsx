"use client";

import Image from "next/image";
import { Star, Trash2 } from "lucide-react";

interface GalleryThumbnailProps {
  src: string;
  alt: string;
  active: boolean;
  isCover?: boolean;
  onPreview: () => void;
  onSetCover?: () => void;
  onDelete?: () => void;
}

export default function GalleryThumbnail({
  src,
  alt,
  active,
  isCover = false,
  onPreview,
  onSetCover,
  onDelete,
}: GalleryThumbnailProps) {
  const canDelete = Boolean(onDelete);

  return (
    <div
      className={`group relative aspect-square overflow-hidden rounded-xl transition ${
        active
          ? "ring-2 ring-white"
          : "ring-1 ring-zinc-800 hover:ring-zinc-500"
      }`}
    >
      <button
        type="button"
        onClick={onPreview}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </button>

      {isCover && (
        <div className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-lg">
          Cover
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/80 via-black/20 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          type="button"
          onClick={onSetCover}
          disabled={!onSetCover}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/80 text-white transition hover:bg-amber-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-zinc-900/80 disabled:hover:text-white"
          title={isCover ? "Cover image" : "Set as cover"}
        >
          <Star size={16} fill={isCover ? "currentColor" : "none"} />
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={!canDelete}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/80 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-zinc-900/80"
          title={
            canDelete
              ? "Delete image"
              : "A product must have at least one image."
          }
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}