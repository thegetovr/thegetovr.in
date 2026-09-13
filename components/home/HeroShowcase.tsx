import Image from "next/image";

export default function HeroShowcase() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      {/* Editorial Glow */}
      <div className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-accent)/10 blur-[90px] sm:blur-[110px] lg:blur-[140px]" />

      {/* Rings — exact center of composition */}
      <div className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--color-border)" />
      <div className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--color-border)" />

      {/* Oversized Tee — framing the hoodie from upper-left */}
      <div className="absolute left-[2%] top-[14%] z-10 w-[39%] -rotate-[10deg] transition-transform duration-300 hover:-translate-y-2 sm:left-[8%] sm:w-[38%] lg:left-[7%] lg:w-[39%]">
        <Image
          src="/images/home/hero-oversized-tee.png"
          alt="The Getovr oversized tee"
          width={700}
          height={900}
          className="h-auto w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.14)]"
          priority
        />
      </div>

      {/* Premium Hoodie — EXACT CENTER */}
      <div className="absolute left-1/2 top-1/2 z-30 w-[50%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:-translate-y-[calc(50%+8px)]">
        <Image
          src="/images/home/hero-premium-hoodie.png"
          alt="The Getovr premium hoodie"
          width={700}
          height={1000}
          className="h-auto w-full object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,0.20)]"
          priority
        />
      </div>

      {/* Regular Tee — framing the hoodie from lower-right */}
      <div className="absolute bottom-[8%] right-[2%] z-20 w-[39%] rotate-[10deg] transition-transform duration-300 hover:-translate-y-2 sm:right-[8%] sm:w-[38%] lg:right-[7%] lg:w-[39%]">
        <Image
          src="/images/home/hero-regular-tee.png"
          alt="The Getovr regular tee"
          width={700}
          height={900}
          className="h-auto w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.14)]"
          priority
        />
      </div>

      {/* Premium Badge */}
      <div className="absolute right-[1%] top-[4%] z-40 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2.5 shadow-(--shadow-soft) sm:px-5 sm:py-3">
        <p className="text-[9px] uppercase tracking-[0.3em] text-(--color-text-muted) sm:text-[10px] sm:tracking-[0.35em]">
          Premium
        </p>

        <p className="mt-1 text-xs font-semibold text-(--color-text-primary) sm:text-sm">
          240 GSM Cotton
        </p>
      </div>

      {/* Design Studio Card */}
      <div className="absolute bottom-[3%] left-[1%] z-40 rounded-md border border-(--color-border) bg-(--color-surface) px-4 py-4 shadow-(--shadow-soft) sm:bottom-[4%] sm:left-[2%] sm:px-5 sm:py-5 lg:left-[1%] lg:px-6 lg:py-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-(--color-text-muted) sm:text-xs sm:tracking-[0.3em]">
          Design Studio
        </p>

        <h3 className="mt-2 font-(--font-editorial) text-xl font-normal leading-7 text-(--color-text-primary) sm:mt-3 sm:text-2xl sm:leading-8">
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