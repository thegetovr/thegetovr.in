type GalleryImageProps = {
  large?: boolean;
};

export default function GalleryImage({
  large = false,
}: GalleryImageProps) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-gradient-to-br
        from-zinc-900
        via-black
        to-zinc-950
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-white/20
        ${
          large
            ? "min-h-[520px]"
            : "min-h-[260px]"
        }
      `}
    >
      {/* Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Placeholder Image */}
      <div className="absolute inset-6 rounded-3xl border border-white/5 bg-zinc-900 flex items-center justify-center">
        <div className="h-20 w-20 rounded-full border border-white/10 bg-black" />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-white/0 transition duration-500 group-hover:bg-white/[0.03]" />
    </div>
  );
}