"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";

/* Germs hug the edges and corners, framing the central text */
const GERMS = [
  { from: { x: -320, y: 0  }, size: 90,  top: "12%",       left: "2%",  radius: "70% 30% 60% 40% / 50% 60% 40% 50%" },
  { from: { x:  320, y: 0  }, size: 110, top: "8%",        right: "1%", radius: "40% 60% 50% 50% / 60% 40% 60% 40%" },
  { from: { x: -260, y:-260 }, size: 75,  top: "2%",        left: "22%", radius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
  { from: { x:  260, y:-260 }, size: 85,  top: "3%",        left: "62%", radius: "50% 50% 30% 70% / 50% 50% 70% 30%" },
  { from: { x: -320, y: 160 }, size: 100, bottom: "10%",    left: "3%",  radius: "40% 60% 70% 30% / 40% 50% 60% 50%" },
  { from: { x:  320, y: 160 }, size: 80,  bottom: "8%",     right: "2%", radius: "70% 30% 50% 50% / 30% 60% 40% 70%" },
  { from: { x:  0,   y: 300 }, size: 95,  bottom: "2%",     left: "42%", radius: "55% 45% 60% 40% / 45% 55% 45% 55%" },
];

export default function GermBlobs({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {GERMS.map((g, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width:        g.size,
            height:       g.size,
            top:          g.top,
            left:         "left" in g ? g.left : undefined,
            right:        "right" in g ? g.right : undefined,
            bottom:       "bottom" in g ? g.bottom : undefined,
            borderRadius: g.radius,
            background:   "radial-gradient(circle at 38% 38%, #ff4444, #9d0208)",
            boxShadow:    "0 0 24px 6px rgba(255,23,68,0.35)",
          }}
          initial={{ x: g.from.x, y: g.from.y, opacity: 0 }}
          animate={
            active
              ? { x: 0, y: 0, opacity: 0.88 }
              : { x: g.from.x, y: g.from.y, opacity: 0 }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
          }
        />
      ))}
    </div>
  );
}
