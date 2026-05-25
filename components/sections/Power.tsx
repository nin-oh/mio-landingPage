"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";
import { useIsMobile } from "@/lib/use-mobile";

const STAT_ITEMS = [
  { value: "99.7%", label: "Stain removal rate" },
  { value: "3×",    label: "Deeper clean" },
  { value: "48h",   label: "Freshness guaranteed" },
];

function ParallaxLayer({
  children,
  speed,
  className = "",
}: {
  children: React.ReactNode;
  speed: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduced || isMobile) return;

    let gsapInstance: typeof import("gsap").gsap | null = null;
    let ScrollTriggerInstance: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      ScrollTriggerInstance = ScrollTrigger;

      if (!ref.current) return;

      gsap.to(ref.current, {
        y: speed * 120,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current.closest("section"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    init();

    return () => {
      ScrollTriggerInstance?.getAll()
        .filter((t) => t.vars.trigger === ref.current?.closest("section"))
        .forEach((t) => t.kill());
    };
  }, [speed, reduced, isMobile]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function Power() {
  const reduced = useReducedMotion();
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headlineRef, { once: true, margin: "-15%" });

  return (
    <section
      id="power"
      className="relative w-full overflow-hidden py-32 md:py-48"
      style={{
        background:
          "linear-gradient(180deg, #1a0010 0%, #8b0045 40%, #e8007a 70%, #ff2d78 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Parallax blobs */}
      <ParallaxLayer speed={-0.4} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[60vw] h-[60vw] rounded-full opacity-20"
          style={{
            top: "10%",
            left: "-10%",
            background: "radial-gradient(circle, #ff2d78, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[40vw] h-[40vw] rounded-full opacity-30"
          style={{
            bottom: "5%",
            right: "-5%",
            background: "radial-gradient(circle, #ffffff, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </ParallaxLayer>

      {/* Burst lines */}
      <ParallaxLayer speed={-0.2} className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 origin-left opacity-10"
            style={{
              width: "60vw",
              height: "1px",
              background: "linear-gradient(90deg, transparent, white)",
              transform: `translateY(-50%) rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </ParallaxLayer>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div ref={headlineRef}>
          <motion.p
            className="text-white/60 uppercase tracking-[0.4em] mb-6"
            style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.85rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduced ? 0 : 0.7 }}
          >
            The Science of Clean
          </motion.p>

          <motion.h2
            className="text-white font-bold leading-tight"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              textShadow: "0 0 60px rgba(255,45,120,0.8)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.15 }}
          >
            Unstoppable
            <br />
            <span style={{ color: "#ffd6e8" }}>Clean Power.</span>
          </motion.h2>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.4 }}
        >
          {STAT_ITEMS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span
                className="text-white font-bold"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                }}
              >
                {value}
              </span>
              <span className="text-white/60 text-xs uppercase tracking-widest text-center">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
