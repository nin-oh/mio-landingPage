"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";
import { useIsMobile } from "@/lib/use-mobile";
import { triggerFlash } from "@/lib/scene-flash";

export default function Scene1Calm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();
  const isMobile   = useIsMobile();
  const [visible, setVisible] = useState(false);

  /* Trigger headline reveal on mount */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), reduced ? 0 : 500);
    return () => clearTimeout(t);
  }, [reduced]);

  /* GSAP pin — desktop only */
  useEffect(() => {
    if (isMobile || reduced) return;
    let st: import("gsap/ScrollTrigger").ScrollTrigger | null = null;
    let cancelled = false;

    import("gsap").then(({ gsap }) =>
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        st = ScrollTrigger.create({
          trigger:    sectionRef.current,
          start:      "top top",
          end:        "+=200%",
          pin:        true,
          pinSpacing: true,
          onLeave:    () => triggerFlash("dark", 0.45),
        });
      })
    );
    return () => { cancelled = true; st?.kill(); };
  }, [isMobile, reduced]);

  return (
    <section
      ref={sectionRef}
      id="scene-calm"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        /* calm-bg.png fallback */
        background: "linear-gradient(180deg, #e8f8ff 0%, #b8eeff 35%, #70c8e8 70%, #0077b6 100%)",
      }}
    >
      {/* Soft radial wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,255,255,0.75) 0%, transparent 70%)",
        }}
      />

      {/* Drifting dust motes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:      4 + (i % 3) * 3,
            height:     4 + (i % 3) * 3,
            left:       `${(i * 23 + 8) % 88}%`,
            top:        `${(i * 17 + 10) % 75}%`,
            background: "rgba(0,150,200,0.35)",
          }}
          animate={reduced ? {} : { y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: (i * 0.4) % 3, ease: "easeInOut" }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          className="uppercase tracking-[0.6em] mb-5"
          style={{ fontSize: "clamp(0.6rem, 1vw, 0.8rem)", color: "#0077b6" }}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 1.1, ease: "easeOut" }}
        >
          Before the battle
        </motion.p>

        <motion.h1
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(3.2rem, 9vw, 8rem)",
            color:         "#03045e",
            lineHeight:    0.95,
            letterSpacing: "0.03em",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Your clothes
          <br />
          <span style={{ color: "#0096c7" }}>deserve peace.</span>
        </motion.h1>

        <motion.p
          className="mt-6 leading-relaxed"
          style={{ color: "#023e8a", fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)", opacity: 0.8 }}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 0.8, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.7 }}
        >
          But the enemy never stops.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="uppercase"
          style={{ color: "#0077b6", fontSize: "0.65rem", letterSpacing: "0.35em" }}
        >
          Scroll
        </span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #0077b6, transparent)" }} />
      </motion.div>
    </section>
  );
}
