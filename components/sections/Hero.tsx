"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";
import ProductOrb from "@/components/ui/ProductOrb";

function Bubble({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35) 0%, rgba(255,45,120,0.15) 60%, transparent 100%)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(2px)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={
        reduced
          ? { opacity: 0.6 }
          : {
              opacity: [0.4, 0.7, 0.4],
              y: [0, -30, 0],
              x: [0, 10, -5, 0],
            }
      }
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

const BUBBLES = [
  { x: "8%",  y: "15%", size: 80,  delay: 0 },
  { x: "78%", y: "10%", size: 50,  delay: 1.2 },
  { x: "85%", y: "55%", size: 110, delay: 0.7 },
  { x: "5%",  y: "65%", size: 60,  delay: 2.1 },
  { x: "50%", y: "80%", size: 40,  delay: 1.8 },
  { x: "30%", y: "5%",  size: 35,  delay: 0.4 },
  { x: "65%", y: "75%", size: 70,  delay: 2.6 },
  { x: "20%", y: "45%", size: 25,  delay: 3.0 },
];

export default function Hero() {
  const reduced = useReducedMotion();
  const bobRef = useRef<HTMLDivElement>(null);

  /* Continuous bob via CSS animation injected once */
  useEffect(() => {
    if (reduced || !bobRef.current) return;
    bobRef.current.style.animation = "heroBob 4s ease-in-out infinite";
  }, [reduced]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 120% 100% at 50% 0%, #ff2d78 0%, #8b0045 40%, #0d0008 80%)",
      }}
    >
      <style>{`
        @keyframes heroBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }
      `}</style>

      {/* Ambient glow behind product */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,45,120,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Floating bubbles */}
      {BUBBLES.map((b, i) => (
        <Bubble key={i} {...b} />
      ))}

      {/* Product */}
      <div ref={bobRef} className="relative z-10">
        <ProductOrb />
      </div>

      {/* Headline */}
      <motion.div
        className="relative z-10 mt-12 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 0.4, ease: "easeOut" }}
      >
        <h1
          className="text-white font-bold leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(3rem, 9vw, 8rem)",
            textShadow: "0 4px 40px rgba(255,45,120,0.6)",
          }}
        >
          MIO
        </h1>
        <p
          className="text-white/80 uppercase tracking-[0.4em] mt-3"
          style={{ fontSize: "clamp(0.7rem, 1.4vw, 1rem)" }}
        >
          Clean like a dream
        </p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
