"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/reduced-motion";
import { useIsMobile } from "@/lib/use-mobile";
import Image from "next/image";

const TOTAL_FRAMES = 12;
const frames = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/sequence/frame-${String(i + 1).padStart(4, "0")}.png`
);

function MobileCarousel() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col items-center gap-6 py-20 px-6">
      <h2
        className="text-white text-center font-bold"
        style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem,7vw,3rem)" }}
      >
        Every Angle.
        <br />
        Pure Perfection.
      </h2>
      <div className="relative w-64 h-64 rounded-2xl overflow-hidden">
        <Image
          src={frames[active]}
          alt={`Product view ${active + 1}`}
          fill
          className="object-cover"
          priority={active === 0}
        />
      </div>
      <div className="flex gap-2">
        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="w-2 h-2 rounded-full transition-colors"
            style={{ background: i === active ? "#ff2d78" : "rgba(255,255,255,0.3)" }}
            aria-label={`View ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ScrollRotate() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isMobile || reduced) return;

    let loadedCount = 0;
    imagesRef.current = frames.map((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      return img;
    });
  }, [isMobile, reduced]);

  useEffect(() => {
    if (isMobile || reduced || !loaded) return;

    let gsapInstance: typeof import("gsap").gsap | null = null;
    let ScrollTriggerInstance: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      ScrollTriggerInstance = ScrollTrigger;

      const canvas = canvasRef.current;
      const section = sectionRef.current;
      if (!canvas || !section) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const drawFrame = (index: number) => {
        const img = imagesRef.current[index];
        if (!img) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      drawFrame(0);

      const proxy = { frame: 0 };

      gsap.to(proxy, {
        frame: TOTAL_FRAMES - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
        onUpdate: () => drawFrame(Math.round(proxy.frame)),
      });
    }

    init();

    return () => {
      ScrollTriggerInstance?.getAll().forEach((t) => t.kill());
    };
  }, [isMobile, reduced, loaded]);

  if (isMobile) return (
    <section
      className="w-full"
      style={{ background: "linear-gradient(180deg, #0d0008 0%, #3d0020 100%)" }}
    >
      <MobileCarousel />
    </section>
  );

  return (
    <section
      ref={sectionRef}
      id="scroll-rotate"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(180deg, #0d0008 0%, #1a0010 100%)" }}
    >
      {/* Label */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <h2
          className="text-white font-bold"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            textShadow: "0 0 40px rgba(255,45,120,0.5)",
          }}
        >
          Every Angle.{" "}
          <span style={{ color: "#ff2d78" }}>Pure Perfection.</span>
        </h2>
        <p className="text-white/50 mt-2 tracking-widest uppercase text-xs">
          Scroll to rotate
        </p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="relative z-10 rounded-2xl"
        style={{
          width: "clamp(280px, 50vw, 600px)",
          height: "clamp(280px, 50vw, 600px)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s",
          boxShadow: "0 0 80px 20px rgba(255,45,120,0.3)",
        }}
      />

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full border-2 border-pink-500 border-t-transparent animate-spin"
          />
        </div>
      )}

      {/* Rim glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,45,120,0.08) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
