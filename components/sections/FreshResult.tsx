"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";

const WORDS = ["Fresh.", "Bright.", "Alive."];

export default function FreshResult() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="fresh"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center py-32 md:py-48"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #c8f0ff 40%, #e8f8ff 70%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,240,255,0.8) 0%, transparent 70%)",
        }}
      />

      {/* Floating sparkle dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 4 + (i % 5) * 2,
            height: 4 + (i % 5) * 2,
            left: `${(i * 17 + 5) % 90}%`,
            top: `${(i * 23 + 10) % 80}%`,
            background: i % 3 === 0 ? "#c8f0ff" : i % 3 === 1 ? "#ff2d78" : "#ffffff",
            boxShadow: `0 0 6px 2px ${i % 3 === 0 ? "rgba(200,240,255,0.8)" : "rgba(255,45,120,0.4)"}`,
          }}
          animate={
            reduced
              ? {}
              : {
                  y: [0, -15, 0],
                  opacity: [0.4, 0.9, 0.4],
                }
          }
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: (i * 0.3) % 3,
            ease: "easeInOut",
          }}
        />
      ))}

      <div ref={ref} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          className="uppercase tracking-[0.5em] mb-8"
          style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.85rem)", color: "#8b0045" }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.6 }}
        >
          The Result
        </motion.p>

        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-8">
          {WORDS.map((word, i) => (
            <motion.h2
              key={word}
              className="font-bold leading-none"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(3rem, 10vw, 8rem)",
                color: i === 2 ? "#ff2d78" : "#0d0008",
                textShadow:
                  i === 2
                    ? "0 0 40px rgba(255,45,120,0.3)"
                    : "0 2px 20px rgba(0,0,0,0.08)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduced ? 0 : 0.8,
                delay: reduced ? 0 : i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.h2>
          ))}
        </div>

        <motion.p
          className="mt-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: "#4a2030", fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.5 }}
        >
          MIO&apos;s bio-enzyme formula lifts every trace of yesterday, leaving
          fabrics as luminous as the day they were new.
        </motion.p>
      </div>
    </section>
  );
}
