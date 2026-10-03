import { motion } from "motion/react";
import { ReactNode } from "react";
import { pageTransition } from "@/lib/animations";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  dir?: "ltr" | "rtl" | "auto";
}

export function PageWrapper({ children, className = "", dir }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      dir={dir}
    >
      {children}
    </motion.div>
  );
}
