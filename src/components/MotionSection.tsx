"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface MotionSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionSection({
  children,
  className = "",
  delay = 0,
  ...props
}: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1], // cinematic easeOut
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export function MotionDiv({
  children,
  className = "",
  delay = 0,
  direction = "up",
  ...props
}: MotionDivProps) {
  const getInitial = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -35 };
      case "right":
        return { opacity: 0, x: 35 };
      case "scale":
        return { opacity: 0, scale: 0.95 };
      case "up":
      default:
        return { opacity: 0, y: 30 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "scale":
        return { opacity: 1, scale: 1 };
      case "up":
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
