export default function HeroShowcase() {
  return (
    <div className="relative h-[700px] w-[620px]">
      {/* Editorial Glow */}
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-accent)/10 blur-[140px]" />

      {/* Rings */}
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--color-border)" />
      <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--color-border)" />

      {/* Oversized Tee */}
      <div className="absolute left-8 top-20 z-10 rotate-[-12deg]">
        <PlaceholderCard
          title="Oversized Tee"
          width="w-52"
          height="h-72"
        />
      </div>

      {/* Hoodie */}
      <div className="absolute left-1/2 top-24 z-30 -translate-x-1/2">
        <PlaceholderCard
          title="Premium Hoodie"
          width="w-72"
          height="h-[420px]"
          featured
        />
      </div>

      {/* T-Shirt */}
      <div className="absolute bottom-12 right-8 z-20 rotate-[10deg]">
        <PlaceholderCard
          title="Regular Tee"
          width="w-56"
          height="h-72"
        />
      </div>

      {/* Badge */}
      <div className="absolute right-0 top-8 rounded-full border border-(--color-border) bg-(--color-surface) px-5 py-3 shadow-(--shadow-soft)">
        <p className="text-[10px] uppercase tracking-[0.35em] text-(--color-text-muted)">
          Premium
        </p>

        <p className="mt-1 text-sm font-semibold text-(--color-text-primary)">
          240 GSM Cotton
        </p>
      </div>

      {/* Design Card */}
      <div className="absolute bottom-8 left-0 rounded-md border border-(--color-border) bg-(--color-surface) px-6 py-5 shadow-(--shadow-soft)">
        <p className="text-xs uppercase tracking-[0.3em] text-(--color-text-muted)">
          Design Studio
        </p>

        <h3 className="mt-3 font-(--font-editorial) text-2xl font-normal leading-8 text-(--color-text-primary)">
          Upload.
          <br />
          Customize.
          <br />
          Print.
        </h3>
      </div>
    </div>
  );
}

type PlaceholderCardProps = {
  title: string;
  width: string;
  height: string;
  featured?: boolean;
};

function PlaceholderCard({
  title,
  width,
  height,
  featured = false,
}: PlaceholderCardProps) {
  return (
    <div
      className={`${width} ${height}
        flex flex-col items-center justify-center
        rounded-(--radius-lg)
        border border-(--color-border)
        bg-(--color-surface)
        shadow-(--shadow-elevated)
        transition-all duration-300
        hover:-translate-y-2
        ${featured ? "ring-1 ring-(--color-accent)" : ""}`}
    >
      <div className="mb-5 h-16 w-16 rounded-full border border-(--color-border) bg-(--color-surface-muted)" />

      <h3 className="font-(--font-editorial) text-xl font-normal text-(--color-text-primary)">
        {title}
      </h3>
    </div>
  );
}