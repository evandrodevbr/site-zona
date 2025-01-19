"use client";

import { motion } from "motion/react";

const easeOutCubic = [0.33, 1, 0.68, 1];

export function FadeIn({ children, delay = 0, duration = 0.6 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: easeOutCubic }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, duration = 0.6 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: easeOutCubic }}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, delay = 0, duration = 0.6, direction = "left" }) {
  const xInitial = direction === "left" ? -30 : direction === "right" ? 30 : 0;
  const yInitial = direction === "up" ? 30 : direction === "down" ? -30 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: xInitial, y: yInitial }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: easeOutCubic }}
    >
      {children}
    </motion.div>
  );
}

export function Hover({ children, scale = 1.03 }) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.3, ease: easeOutCubic }}
    >
      {children}
    </motion.div>
  );
}

export function Pulse({ children }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.03, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function Float({ children }) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
} 