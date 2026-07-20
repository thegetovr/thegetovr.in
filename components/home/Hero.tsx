import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />

        <img
          src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop"
          alt="The Getovr"
          className="h-full w-full object-cover opacity-40"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">

        <span className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.4em]">
          Premium Custom Apparel
        </span>

        <h1 className="mt-8 text-6xl font-black uppercase leading-none md:text-8xl">
          CREATE CLOTHES
          <br />
          THAT ARE YOURS.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-300">
          Design premium hoodies and oversized t-shirts with your own artwork,
          text, and ideas. Printed on demand and delivered to your door.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

          <Link
            href="/studio"
            className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            Start Designing
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/shop"
            className="rounded-full border border-white px-8 py-4 transition hover:bg-white hover:text-black"
          >
            Browse Collection
          </Link>

        </div>

      </div>
    </section>
  );
}