"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";
import { useIsMobile } from "@/lib/use-mobile";
import { triggerFlash } from "@/lib/scene-flash";
import GermBlobs from "@/components/effects/GermBlobs";

export default function Scene2Threat() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();
  const isMobile   = useIsMobile();
  const [active, setActive] = useState(false);

  /* GSAP pin — desktop */
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
          end:        "+=260%",
          pin:        true,
          pinSpacing: true,
          onEnter: () => {
            setActive(true);
            /* Screen shake on the villain text ~900ms after germs arrive */
            setTimeout(() => {
              if (!textRef.current) return;
              gsap.to(textRef.current, {
                x:        7,
                duration: 0.04,
                yoyo:     true,
                repeat:   9,
                ease:     "none",
                onComplete: () => gsap.set(textRef.current!, { x: 0 }),
              });
            }, 900);
          },
          onLeave: () => triggerFlash("white", 0.5),
        });
      })
    );
    return () => { cancelled = true; st?.kill(); };
  }, [isMobile, reduced]);

  /* Mobile: IntersectionObserver reveal */
  useEffect(() => {
    if (!isMobile) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="scene-threat"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        /* germ-horde.png fallback */
        background: "linear-gradient(180deg, #0a0008 0%, #1c0000 50%, #0d0000 100%)",
      }}
    >
      {/* Red vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 25%, rgba(200,0,0,0.35) 75%, rgba(140,0,0,0.55) 100%)",
        }}
      />

      {/* Pulsing center glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,23,68,0.14) 0%, transparent 70%)",
        }}
        animate={active && !reduced ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Germ blobs slide in from edges */}
      <GermBlobs active={active} />

      {/* Central villain text */}
      <div ref={textRef} className="relative z-10 text-center px-6">
        <motion.p
          className="uppercase tracking-[0.5em] mb-4"
          style={{ fontSize: "clamp(0.6rem, 1vw, 0.8rem)", color: "#ff4444" }}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.2 }}
        >
          The threat is real
        </motion.p>

        <motion.h2
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(3.5rem, 12vw, 11rem)",
            color:         "#ff1744",
            lineHeight:    0.9,
            letterSpacing: "0.02em",
            textShadow:    "0 0 70px rgba(255,23,68,0.8), 0 0 120px rgba(255,23,68,0.4)",
          }}
          initial={{ opacity: 0, scale: 1.4, y: -24 }}
          animate={active ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 600, damping: 28, delay: 0.35 }
          }
        >
          THEY NEVER
          <br />
          <span style={{ color: "#ffffff", textShadow: "none" }}>STOP.</span>
        </motion.h2>

        <motion.p
          className="mt-7 uppercase tracking-widest"
          style={{ fontSize: "clamp(0.75rem, 1.4vw, 1rem)", color: "rgba(255,80,80,0.8)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.85 }}
        >
          Bacteria · Mold · Odor · Everywhere.
        </motion.p>
      </div>
    </section>
  );
}
