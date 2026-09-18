import Image from "next/image";

type GalleryImageProps = {
  src: string;
  alt: string;
  large?: boolean;
};

export default function GalleryImage({
  src,
  alt,
  large = false,
}: GalleryImageProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-(--radius-lg)
        border border-(--color-border)
        bg-(--color-surface)
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-(--shadow-elevated)
        ${large ? "min-h-[520px]" : "min-h-[260px]"}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={
          large
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
      />

      <div className="absolute inset-0 bg-(--color-accent)/0 transition-colors duration-500 group-hover:bg-(--color-accent)/5" />
    </div>
  );
}