"use client";

import { useReducedMotion } from "@/lib/reduced-motion";

/* Continuously looping horizontal lines — appropriate for a PINNED scene
   where scroll doesn't actually translate the viewport. */
const LINES = Array.from({ length: 22 }, (_, i) => ({
  top:      `${3 + i * 4.3}%`,
  width:    `${30 + (i % 6) * 12}%`,
  height:   i % 4 === 0 ? 2 : 1,
  opacity:  0.12 + (i % 5) * 0.08,
  duration: `${0.35 + (i % 5) * 0.12}s`,
  delay:    `${-(i * 0.07)}s`, /* negative delay staggers them on first render */
}));

export default function SpeedLinesHoriz({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {LINES.map(({ top, width, height, opacity, duration, delay }, i) => (
        <div
          key={i}
          className="absolute left-0"
          style={{
            top,
            width,
            height,
            opacity: active ? opacity : 0,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.9) 30%, #ffffff 50%, rgba(0,217,255,0.9) 70%, transparent 100%)",
            animation:
              active && !reduced
                ? `whipRight ${duration} ${delay} linear infinite`
                : "none",
            transition: "opacity 0.3s",
          }}
        />
      ))}
    </div>
  );
}
