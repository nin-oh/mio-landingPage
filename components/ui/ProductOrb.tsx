"use client";

/* Placeholder for the real MIO bottle — a glowing gradient orb */
export default function ProductOrb({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      aria-label="MIO product"
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, #ff2d78 0%, #e8007a 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Bottle body */}
      <div
        className="relative z-10 flex flex-col items-center justify-center rounded-[40%_40%_45%_45%] shadow-2xl"
        style={{
          width: "clamp(140px, 22vw, 280px)",
          height: "clamp(220px, 36vw, 440px)",
          background:
            "linear-gradient(160deg, #ffffff 0%, #ffd6e8 20%, #ff2d78 55%, #8b0045 100%)",
          boxShadow:
            "0 0 60px 20px rgba(255,45,120,0.5), inset 2px 2px 8px rgba(255,255,255,0.6)",
        }}
      >
        {/* Highlight streak */}
        <div
          className="absolute left-[18%] top-[8%] w-[14%] h-[40%] rounded-full opacity-70"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)",
          }}
        />
        {/* Logo text */}
        <span
          className="relative z-20 text-white font-bold tracking-widest select-none"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.5rem, 3vw, 2.8rem)",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          MIO
        </span>
        <span
          className="relative z-20 text-white/70 tracking-[0.3em] uppercase select-none"
          style={{ fontSize: "clamp(0.45rem, 0.8vw, 0.7rem)", marginTop: "4px" }}
        >
          Laundry
        </span>
      </div>
    </div>
  );
}
