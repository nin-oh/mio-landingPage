"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";

const FEATURES = [
  {
    icon: "✦",
    title: "Bio-Enzyme Formula",
    body: "Precision-engineered enzymes break down stains at a molecular level.",
  },
  {
    icon: "◈",
    title: "Colour-Lock Technology",
    body: "Vibrants stay vivid. Darks stay dark. Wash after wash.",
  },
  {
    icon: "⬡",
    title: "Skin-Kind pH",
    body: "Dermatologist-tested. Safe for sensitive skin and delicate fabrics.",
  },
  {
    icon: "◯",
    title: "Carbon-Neutral Production",
    body: "Every bottle offset. Clean clothes, clean conscience.",
  },
];

export default function TrustRow() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="trust"
      className="relative w-full py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d0008 0%, #1a0010 60%, #0d0008 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,45,120,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,120,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.7 }}
        >
          <p className="text-white/40 uppercase tracking-[0.4em] text-xs mb-4">
            Why MIO
          </p>
          <h2
            className="text-white font-bold"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            Engineered for the{" "}
            <span style={{ color: "#ff2d78" }}>Obsessive.</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon, title, body }, i) => (
            <motion.div
              key={title}
              className="relative rounded-2xl p-8 flex flex-col gap-4 overflow-hidden group cursor-default"
              style={{
                background: "rgba(255,45,120,0.06)",
                border: "1px solid rgba(255,45,120,0.18)",
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: reduced ? 0 : 0.7,
                delay: reduced ? 0 : i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                reduced
                  ? {}
                  : {
                      scale: 1.03,
                      borderColor: "rgba(255,45,120,0.5)",
                      backgroundColor: "rgba(255,45,120,0.1)",
                    }
              }
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(255,45,120,0.15), transparent 70%)",
                }}
              />

              <span
                className="text-3xl"
                style={{ color: "#ff2d78", lineHeight: 1 }}
              >
                {icon}
              </span>
              <h3
                className="text-white font-semibold"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
              >
                {title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
