type GalleryImageProps = {
  large?: boolean;
};

export default function GalleryImage({
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
        ${
          large
            ? "min-h-[520px]"
            : "min-h-[260px]"
        }`}
    >
      {/* Editorial Image Placeholder */}
      <div className="absolute inset-6 flex items-center justify-center rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-muted)">
        <div className="h-20 w-20 rounded-full border border-(--color-border) bg-(--color-surface)" />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-(--color-accent)/0 transition-colors duration-500 group-hover:bg-(--color-accent)/5" />
    </div>
  );
}