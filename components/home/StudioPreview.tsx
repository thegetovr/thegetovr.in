import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StudioPreview() {
  return (
    <section className="relative overflow-hidden bg-(--color-surface-muted) py-24 lg:py-32">
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-accent)/5 blur-[180px]" />

      <div className="relative mx-auto flex max-w-7xl items-center gap-16 px-6 lg:gap-20 lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-(--color-text-muted)">
            Design Studio
          </p>

          <h2 className="mt-5 font-(--font-editorial) text-5xl font-normal leading-tight text-(--color-text-primary) lg:text-6xl">
            Design It
            <br />
            Before You
            <br />
            Wear It.
          </h2>

          <p className="mt-8 text-lg leading-8 text-(--color-text-secondary)">
            Upload your logo, add text, position your artwork, preview every
            detail and create apparel that&apos;s uniquely yours.
          </p>

          <ul className="mt-10 space-y-4 text-(--color-text-secondary)">
            <li>✓ Upload Your Artwork</li>
            <li>✓ Drag, Resize &amp; Rotate</li>
            <li>✓ Add Custom Text</li>
            <li>✓ Live Design Preview</li>
          </ul>

          <Link
            href="/studio"
            className="group mt-12 inline-flex items-center gap-3 rounded-sm bg-(--color-text-primary) px-8 py-4 font-semibold text-(--color-white) transition-colors hover:bg-(--color-text-secondary)"
          >
            Open Design Studio

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative flex-1">
          <div className="overflow-hidden rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) shadow-(--shadow-elevated)">
            <div className="flex items-center gap-2 border-b border-(--color-border) px-6 py-4">
              <div className="h-3 w-3 rounded-full bg-(--color-border)" />
              <div className="h-3 w-3 rounded-full bg-(--color-border)" />
              <div className="h-3 w-3 rounded-full bg-(--color-border)" />
            </div>

            <div className="grid h-[520px] grid-cols-[220px_1fr]">
              <div className="border-r border-(--color-border) bg-(--color-surface-muted) p-5">
                <div className="mb-5 h-10 rounded-sm bg-(--color-surface)" />

                <div className="space-y-3">
                  <div className="h-14 rounded-md bg-(--color-surface)" />
                  <div className="h-14 rounded-md bg-(--color-surface)" />
                  <div className="h-14 rounded-md bg-(--color-surface)" />
                  <div className="h-14 rounded-md bg-(--color-surface)" />
                </div>
              </div>

              <div className="relative flex items-center justify-center bg-(--color-page)">
                <div className="absolute h-80 w-80 rounded-full bg-(--color-accent)/5 blur-[80px]" />

                <div className="relative h-[340px] w-[250px] rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) shadow-(--shadow-elevated)">
                  <div className="absolute left-1/2 top-10 h-16 w-16 -translate-x-1/2 rounded-full border border-(--color-border) bg-(--color-surface-muted)" />

                  <div className="absolute left-1/2 top-40 h-24 w-24 -translate-x-1/2 rounded-md border-2 border-dashed border-(--color-accent)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}