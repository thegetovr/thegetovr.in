import Image from "next/image";

interface ProductMedia {
  url: string;
  alt: string;
}

interface ProductImageCardProps {
  title?: string;
  media: ProductMedia[];
  fallbackText?: string;
}

export default function ProductImageCard({
  title = "Product Image",
  media,
  fallbackText = "No product image",
}: ProductImageCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">
        {title}
      </h2>

      {media.length > 0 ? (
        <div className="relative aspect-square overflow-hidden rounded-lg border border-zinc-800">
          <Image
            src={media[0].url}
            alt={media[0].alt}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-zinc-700 text-sm text-zinc-500">
          {fallbackText}
        </div>
      )}
    </div>
  );
}