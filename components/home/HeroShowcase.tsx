export default function HeroShowcase() {
  return (
    <div className="relative h-[700px] w-[620px]">

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[140px]" />

      {/* Rings */}
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />

      {/* Oversized Tee */}
      <div className="absolute left-8 top-20 rotate-[-12deg] z-10">
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
      <div className="absolute right-8 bottom-12 rotate-[10deg] z-20">
        <PlaceholderCard
          title="Regular Tee"
          width="w-56"
          height="h-72"
        />
      </div>

      {/* Badge */}
      <div className="absolute right-0 top-8 rounded-full border border-white/10 bg-black/70 px-5 py-3 backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
          PREMIUM
        </p>
        <p className="mt-1 text-sm font-semibold">
          240 GSM Cotton
        </p>
      </div>

      {/* Design Card */}
      <div className="absolute bottom-8 left-0 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          DESIGN STUDIO
        </p>

        <h3 className="mt-3 text-lg font-bold leading-8">
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
      rounded-[32px]
      border border-white/10
      bg-gradient-to-br
      from-zinc-900
      via-black
      to-zinc-950
      shadow-[0_40px_80px_rgba(0,0,0,0.75)]
      backdrop-blur-xl
      flex
      flex-col
      items-center
      justify-center
      transition-all
      duration-300
      hover:-translate-y-2
      ${
        featured ? "ring-1 ring-white/10" : ""
      }`}
    >
      <div className="mb-5 h-16 w-16 rounded-full border border-white/10 bg-white/5" />

      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>
    </div>
  );
}