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
        transition-all duration-700 ease-out
        hover:-translate-y-1
        hover:shadow-(--shadow-elevated)
        ${large ? "min-h-[520px]" : "min-h-[260px]"}`}
    >
      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.055]"
        sizes={
          large
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-(--color-accent)/0 transition-colors duration-700 group-hover:bg-(--color-accent)/5" />

      {/* Subtle Shine */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
    </div>
  );
}
