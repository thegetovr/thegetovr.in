import Image from "next/image";

interface ProductPreviewProps {
  src: string;
  alt: string;
}

export default function ProductPreview({
  src,
  alt,
}: ProductPreviewProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg border border-zinc-800">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}