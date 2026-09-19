"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { HomeMedia } from "@/types/home";

interface HeroShowcaseProps {
  heroImage: HomeMedia | null;
}

export default function HeroShowcase({
  heroImage,
}: HeroShowcaseProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-(--color-page)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {heroImage?.url ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-[58%_27%]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-(--color-page) text-[10px] uppercase tracking-[0.25em] text-(--color-text-muted)">
            Hero Image
          </div>
        )}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-white/[0.01]" />
    </motion.div>
  );
}