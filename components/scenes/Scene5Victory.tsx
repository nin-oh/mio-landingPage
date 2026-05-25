"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";
import { useIsMobile } from "@/lib/use-mobile";
import ProductBottle from "@/components/ui/ProductBottle";

const FACTS = [
  { label: "99.9% Antibacterial",    icon: "✦" },
  { label: "63 Washes Per Bottle",   icon: "◎" },
  { label: "Formulated in France",   icon: "◆" },
];

export default function Scene5Victory() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
          onEnter:    () => setActive(true),
        });
      })
    );
    return () => { cancelled = true; st?.kill(); };
  }, [isMobile, reduced]);

  /* Mobile */
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
      id="scene-victory"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        /* victory-bg.png fallback */
        background: "linear-gradient(180deg, #ffffff 0%, #b8f0ff 25%, #0096c7 68%, #023e8a 100%)",
      }}
    >
      {/* Victory burst — white ring expands and fades */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:      "min(80vw, 500px)",
          height:     "min(80vw, 500px)",
          background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(0,217,255,0.3) 50%, transparent 70%)",
        }}
        initial={{ scale: 0.1, opacity: 1 }}
        animate={active ? { scale: 4, opacity: 0 } : {}}
        transition={reduced ? { duration: 0 } : { duration: 1.3, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 px-8 max-w-5xl mx-auto w-full justify-center">
        {/* Bottle settles in from below */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <ProductBottle />
        </motion.div>

        {/* Text side */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={reduced ? { duration: 0 } : { duration: 0.7, delay: 0.6 }}
          >
            <p
              className="uppercase tracking-[0.5em] mb-2"
              style={{ fontSize: "clamp(0.6rem, 1vw, 0.8rem)", color: "#0077b6" }}
            >
              Mission complete
            </p>
            <h2
              style={{
                fontFamily:    "var(--font-bebas)",
                fontSize:      "clamp(2.8rem, 6.5vw, 5.5rem)",
                color:         "#03045e",
                letterSpacing: "0.04em",
                lineHeight:    0.95,
              }}
            >
              The Threat
              <br />
              <span style={{ color: "#0096c7" }}>Eliminated.</span>
            </h2>
          </motion.div>

          {/* Product facts */}
          {FACTS.map(({ label, icon }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -32 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.82 + i * 0.15, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <span style={{ color: "#00d9ff", fontSize: "1.2rem", lineHeight: 1 }}>{icon}</span>
              <span
                style={{
                  fontFamily:    "var(--font-bebas)",
                  fontSize:      "clamp(1.1rem, 2.2vw, 1.75rem)",
                  color:         "#03045e",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </span>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 1.3 }}
          >
            <motion.button
              className="mt-2 rounded-full font-bold uppercase"
              style={{
                fontFamily:    "var(--font-bebas)",
                fontSize:      "clamp(0.85rem, 1.3vw, 1.05rem)",
                letterSpacing: "0.18em",
                color:         "#ffffff",
                background:    "linear-gradient(135deg, #0096c7, #023e8a)",
                boxShadow:     "0 0 40px rgba(0,150,199,0.5)",
                padding:       "1rem 2.5rem",
              }}
              whileHover={
                reduced
                  ? {}
                  : { scale: 1.06, boxShadow: "0 0 60px rgba(0,150,199,0.75)" }
              }
              whileTap={reduced ? {} : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Meet Your Protector
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
