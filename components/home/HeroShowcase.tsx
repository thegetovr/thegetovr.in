"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const words = ["Ideas", "Designs", "People", "Stories"];

export default function HeroShowcase() {
  return (
    <motion.div
      className="group relative h-full min-h-[390px] overflow-hidden bg-(--color-charcoal-900) sm:min-h-[450px] lg:min-h-full"
      initial={{ opacity: 0, scale: 1.025 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Hero Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src="/images/home/hero-main.webp"
          alt="GETOVR Good Things Take Time collection"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 59vw"
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.15,
        }}
      />

      {/* Side Text */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-end gap-1.5 sm:bottom-10 sm:right-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {words.map((word, index) => (
          <motion.span
            key={word}
            className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.5 + index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Bottom Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-1/3 bg-white/40"
        initial={{
          scaleX: 0,
          transformOrigin: "left",
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  );
}
