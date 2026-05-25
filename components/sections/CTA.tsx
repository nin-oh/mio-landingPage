"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";

export default function CTA() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="cta"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 120% 100% at 50% 100%, #ff2d78 0%, #8b0045 40%, #0d0008 80%)",
      }}
    >
      {/* Rotating accent ring */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "min(70vw, 600px)",
          height: "min(70vw, 600px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "min(50vw, 440px)",
          height: "min(50vw, 440px)",
          border: "1px solid rgba(255,45,120,0.15)",
        }}
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(255,45,120,0.4) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          className="text-white/50 uppercase tracking-[0.5em] mb-6"
          style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.85rem)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.6 }}
        >
          Begin Your Ritual
        </motion.p>

        <motion.h2
          className="text-white font-bold leading-none mb-8"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            textShadow: "0 0 80px rgba(255,45,120,0.7)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.15 }}
        >
          Feel the
          <br />
          Difference.
        </motion.h2>

        <motion.p
          className="text-white/60 mb-12 max-w-md mx-auto leading-relaxed"
          style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.3 }}
        >
          Join over 2 million people who&apos;ve made laundry the highlight
          of their week.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.45 }}
        >
          <motion.button
            className="relative overflow-hidden rounded-full px-10 py-4 text-white font-semibold tracking-widest uppercase"
            style={{
              background: "linear-gradient(135deg, #ff2d78, #e8007a)",
              fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
              boxShadow: "0 0 40px rgba(255,45,120,0.5)",
            }}
            whileHover={reduced ? {} : { scale: 1.05, boxShadow: "0 0 60px rgba(255,45,120,0.7)" }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Shop MIO
          </motion.button>

          <motion.button
            className="rounded-full px-10 py-4 text-white/80 font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
            }}
            whileHover={
              reduced
                ? {}
                : {
                    scale: 1.04,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.4)",
                  }
            }
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.p
        className="absolute bottom-8 text-white/20 text-xs tracking-widest"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.8 }}
      >
        MIO™ — Laundry Elevated
      </motion.p>
    </section>
  );
}
