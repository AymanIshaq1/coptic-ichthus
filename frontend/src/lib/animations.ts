// Shared Framer Motion animation variants for the Church History website
// This file defines the canonical animation style used in the Hero component.
// All other components should import and reuse these variants to ensure a
// consistent look and feel and to avoid duplicating animation code.

import { Variants } from "motion/react";

// Hero‑style fade‑scale animation (opacity 0→1, scale 0.97→1, duration 0.8s)
export const heroFadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Existing variants (kept for backward compatibility)
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.5, ease: "easeOut" } },
};

export const sectionTitle: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const viewportConfig = { once: true, amount: 0.2 };

// Hover and other interaction variants (imported elsewhere)
export const hoverButton = {
  hover: { scale: 1.05, y: -2, transition: { duration: 0.25 } },
  tap: { scale: 0.97, transition: { duration: 0.25 } },
};

export const hoverCard = {
  rest: {},
  hover: {
    y: -8,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 },
  },
};
