"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-(--color-page)">
      <div className="flex w-[220px] flex-col items-center">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center"
        >
          <h1 className="font-(--font-sans) text-2xl font-black tracking-[-0.06em] text-(--color-text-primary) sm:text-3xl">
            THE GETOVR
          </h1>

          <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.32em] text-(--color-text-muted)">
            Light Canvas. Dark Attitude.
          </p>
        </motion.div>

        {/* Loading Line */}
        <div className="mt-8 h-px w-full overflow-hidden bg-(--color-border)">
          <motion.div
            className="h-full origin-left bg-(--color-text-primary)"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.15,
            }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-3 text-[8px] font-medium uppercase tracking-[0.25em] text-(--color-text-muted)"
        >
          Loading
        </motion.p>
      </div>
    </div>
  );
}
