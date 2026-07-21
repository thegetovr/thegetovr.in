import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StudioPreview() {
  return (
    <section className="relative overflow-hidden bg-black py-36">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[180px]" />

      <div className="relative mx-auto flex max-w-7xl items-center gap-20 px-8">

        {/* Left Side */}

        <div className="max-w-xl">

          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
            DESIGN STUDIO
          </p>

          <h2 className="mt-5 text-5xl font-black leading-tight">
            Design It
            <br />
            Before You
            <br />
            Wear It.
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-400">
            Upload your logo, add text, position your artwork,
            preview every detail and create apparel that's uniquely yours.
          </p>

          <ul className="mt-10 space-y-4 text-gray-300">

            <li>✓ Upload Your Artwork</li>

            <li>✓ Drag, Resize & Rotate</li>

            <li>✓ Add Custom Text</li>

            <li>✓ Live Design Preview</li>

          </ul>

          <Link
            href="/studio"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            Open Design Studio

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>

        {/* Right Side */}

        <div className="relative flex-1">

          {/* Browser */}

          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950 shadow-[0_40px_100px_rgba(0,0,0,0.7)]">

            {/* Browser Bar */}

            <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">

              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-700" />

            </div>

            {/* Fake Studio */}

            <div className="grid h-[520px] grid-cols-[220px_1fr]">

              {/* Sidebar */}

              <div className="border-r border-white/10 bg-black p-5">

                <div className="mb-5 h-10 rounded-lg bg-white/5" />

                <div className="space-y-3">

                  <div className="h-14 rounded-xl bg-white/5" />
                  <div className="h-14 rounded-xl bg-white/5" />
                  <div className="h-14 rounded-xl bg-white/5" />
                  <div className="h-14 rounded-xl bg-white/5" />

                </div>

              </div>

              {/* Canvas */}

              <div className="relative flex items-center justify-center bg-[#090909]">

                <div className="absolute h-80 w-80 rounded-full bg-white/[0.03] blur-[80px]" />

                <div className="relative h-[340px] w-[250px] rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-2xl">

                  <div className="absolute left-1/2 top-10 h-16 w-16 -translate-x-1/2 rounded-full border border-white/10 bg-white/5" />

                  <div className="absolute left-1/2 top-40 h-24 w-24 -translate-x-1/2 rounded-xl border-2 border-dashed border-white/20" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}