"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";
import { useIsMobile } from "@/lib/use-mobile";
import { triggerFlash } from "@/lib/scene-flash";
import SpeedLinesRadial from "@/components/effects/SpeedLinesRadial";
import EnergyRings from "@/components/effects/EnergyRings";
import ProductBottle from "@/components/ui/ProductBottle";

export default function Scene3Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottleRef  = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();
  const isMobile   = useIsMobile();
  const [active,        setActive]        = useState(false);
  const [bottleVisible, setBottleVisible] = useState(false);
  const [textVisible,   setTextVisible]   = useState(false);

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
            /* Bottle springs in at t=0, shakes at t=600ms, text at t=650ms */
            setTimeout(() => setBottleVisible(true), 80);
            setTimeout(() => {
              if (bottleRef.current) {
                gsap.to(bottleRef.current, {
                  x:        9,
                  duration: 0.04,
                  yoyo:     true,
                  repeat:   11,
                  ease:     "none",
                  onComplete: () => gsap.set(bottleRef.current!, { x: 0 }),
                });
              }
              setTextVisible(true);
            }, 620);
          },
          onLeave: () => triggerFlash("teal", 0.4),
        });
      })
    );
    return () => { cancelled = true; st?.kill(); };
  }, [isMobile, reduced]);

  /* Mobile */
  useEffect(() => {
    if (!isMobile) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          setTimeout(() => setBottleVisible(true), 100);
          setTimeout(() => setTextVisible(true), reduced ? 0 : 500);
        }
      },
      { threshold: 0.35 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [isMobile, reduced]);

  return (
    <section
      ref={sectionRef}
      id="scene-hero"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        /* mio-hero.png fallback — hero palette: bright teal/white */
        background: "linear-gradient(180deg, #ffffff 0%, #c0f4ff 28%, #00b4d8 68%, #0077b6 100%)",
      }}
    >
      {/* Speed-line explosion radiating from center */}
      <SpeedLinesRadial active={active} />

      {/* Expanding energy rings */}
      <EnergyRings active={active} />

      {/* BOTTLE — springs in, then GSAP shakes it */}
      <div ref={bottleRef} className="relative z-10">
        <motion.div
          initial={{ scale: 0.08, opacity: 0 }}
          animate={bottleVisible ? { scale: 1, opacity: 1 } : {}}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 480, damping: 20, delay: 0 }
          }
        >
          <ProductBottle />
        </motion.div>
      </div>

      {/* HERO TEXT — slams in after bottle lands */}
      <div className="relative z-10 text-center mt-6 px-6">
        {/* First line: scale slam */}
        <motion.div
          initial={{ scale: 1.6, opacity: 0 }}
          animate={textVisible ? { scale: 1, opacity: 1 } : {}}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 700, damping: 32 }
          }
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(2.8rem, 8vw, 7.5rem)",
            color:         "#03045e",
            letterSpacing: "0.06em",
            lineHeight:    1,
          }}
        >
          MIO MATIC.
        </motion.div>

        {/* Second line: slides in from left */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={textVisible ? { x: 0, opacity: 1 } : {}}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 700, damping: 34, delay: 0.18 }
          }
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(2.8rem, 8vw, 7.5rem)",
            color:         "#00b4d8",
            letterSpacing: "0.06em",
            lineHeight:    1,
            textShadow:    "0 0 40px rgba(0,180,216,0.6)",
          }}
        >
          THE PROTECTOR.
        </motion.div>
      </div>
    </section>
  );
}
