"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";

const LINES = Array.from({ length: 32 }, (_, i) => {
  const angle = i * (360 / 32);
  const rads  = (angle * Math.PI) / 180;
  const len   = 200 + (i % 5) * 40;
  return {
    x2: 300 + Math.cos(rads) * len,
    y2: 300 + Math.sin(rads) * len,
    width:   1 + (i % 3) * 0.8,
    opacity: 0.25 + (i % 4) * 0.15,
    delay:   i * 0.006,
  };
});

export default function SpeedLinesRadial({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ scale: 0.2, opacity: 0 }}
      animate={
        active
          ? { scale: reduced ? 1 : 1.08, opacity: 1 }
          : { scale: 0.2, opacity: 0 }
      }
      transition={
        active
          ? { type: "spring", stiffness: 450, damping: 28 }
          : { duration: 0 }
      }
    >
      <svg viewBox="0 0 600 600" className="w-full h-full" style={{ overflow: "visible" }}>
        {LINES.map(({ x2, y2, width, opacity, delay }, i) => (
          <motion.line
            key={i}
            x1="300" y1="300"
            x2={x2}  y2={y2}
            stroke="white"
            strokeWidth={width}
            style={{ opacity: 0 }}
            animate={{ opacity: active ? opacity : 0 }}
            transition={{
              duration: 0.06,
              delay: active ? delay : 0,
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
