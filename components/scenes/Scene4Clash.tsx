"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";
import { useIsMobile } from "@/lib/use-mobile";
import { triggerFlash } from "@/lib/scene-flash";
import SpeedLinesHoriz from "@/components/effects/SpeedLinesHoriz";

/* Text reveals in 3 phases driven by scroll progress */
type Phase = 0 | 1 | 2 | 3;

export default function Scene4Clash() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();
  const isMobile   = useIsMobile();
  const [active, setActive] = useState(false);
  const [phase,  setPhase]  = useState<Phase>(0);

  /* GSAP pin — desktop, scrubbed text phases */
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
          end:        "+=360%",
          pin:        true,
          pinSpacing: true,
          scrub:      0.8,
          onEnter: () => setActive(true),
          onLeave: () => triggerFlash("white", 0.3),
          onUpdate: (self) => {
            const p = self.progress;
            const next: Phase = p < 0.22 ? 1 : p < 0.52 ? 2 : 3;
            setPhase((prev) => (prev !== next ? next : prev));
          },
        });
      })
    );
    return () => { cancelled = true; st?.kill(); };
  }, [isMobile, reduced]);

  /* Mobile: stagger phases on enter */
  useEffect(() => {
    if (!isMobile) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          setTimeout(() => setPhase(1), 100);
          setTimeout(() => setPhase(2), 600);
          setTimeout(() => setPhase(3), 1100);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="scene-clash"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        /* clash-bg.png fallback */
        background: "linear-gradient(135deg, #060614 0%, #001822 45%, #002535 80%, #001018 100%)",
      }}
    >
      {/* Teal energy burst glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,217,255,0.18) 0%, transparent 70%)",
        }}
        animate={active && !reduced ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Looping horizontal speed lines */}
      <SpeedLinesHoriz active={active} />

      {/* ×7 ANTIBACTERIAL POWER */}
      <div className="relative z-10 text-center px-6 select-none">
        {/* ×7 */}
        <motion.div
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(5rem, 18vw, 16rem)",
            color:         "#00d9ff",
            letterSpacing: "0.01em",
            lineHeight:    1,
            textShadow:    "0 0 80px rgba(0,217,255,0.9), 0 0 160px rgba(0,217,255,0.4)",
          }}
          initial={{ scale: 3, opacity: 0 }}
          animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 22 }
          }
        >
          ×7
        </motion.div>

        {/* ANTIBACTERIAL */}
        <motion.div
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(1.6rem, 5vw, 5rem)",
            color:         "#ffffff",
            letterSpacing: "0.18em",
            lineHeight:    1,
          }}
          initial={{ opacity: 0, x: -90 }}
          animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 500, damping: 30 }
          }
        >
          ANTIBACTERIAL
        </motion.div>

        {/* POWER */}
        <motion.div
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(2.5rem, 7.5vw, 7.5rem)",
            color:         "#00d9ff",
            letterSpacing: "0.1em",
            lineHeight:    1,
            textShadow:    "0 0 50px rgba(0,217,255,0.65)",
          }}
          initial={{ opacity: 0, scale: 2 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 580, damping: 28 }
          }
        >
          POWER
        </motion.div>
      </div>
    </section>
  );
}
