"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";

const RINGS = [
  { delay: 0,   scale: 3.5, color: "rgba(0,217,255,0.7)" },
  { delay: 0.2, scale: 5,   color: "rgba(0,217,255,0.45)" },
  { delay: 0.4, scale: 7,   color: "rgba(0,217,255,0.2)" },
];

const SIZE = "clamp(100px, 14vw, 200px)";

export default function EnergyRings({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {RINGS.map(({ delay, scale, color }, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: SIZE, height: SIZE, border: `2px solid ${color}` }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={
            active && !reduced
              ? { scale, opacity: [0.8, 0] }
              : { scale: 0.4, opacity: 0 }
          }
          transition={{
            duration: 1.6,
            delay,
            repeat: active ? Infinity : 0,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
