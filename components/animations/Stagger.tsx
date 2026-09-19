"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  y?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Stagger({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      custom={{
        delay,
        stagger,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div"> & {
  children: ReactNode;
}) {
  return (
    <motion.div className={className} variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}
