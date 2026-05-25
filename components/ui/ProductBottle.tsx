"use client";

/* Placeholder for /public/mio-hero.png — teal/white stylised bottle */
export default function ProductBottle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      aria-label="MIO MATIC bottle"
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,217,255,0.55) 0%, transparent 70%)",
          filter: "blur(38px)",
        }}
      />
      {/* Bottle body */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{
          width:        "clamp(110px, 17vw, 220px)",
          height:       "clamp(185px, 28vw, 380px)",
          background:
            "linear-gradient(160deg, #ffffff 0%, #b8f0ff 22%, #00d9ff 58%, #0077b6 100%)",
          borderRadius: "40% 40% 45% 45%",
          boxShadow:
            "0 0 70px 18px rgba(0,217,255,0.45), inset 2px 2px 8px rgba(255,255,255,0.55)",
        }}
      >
        {/* Highlight streak */}
        <div
          className="absolute left-[16%] top-[8%] w-[11%] h-[36%] rounded-full opacity-65"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)",
          }}
        />
        <span
          className="relative z-20 font-bold"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize:   "clamp(1.5rem, 3vw, 3rem)",
            color:      "#03045e",
            letterSpacing: "0.1em",
          }}
        >
          MIO
        </span>
        <span
          className="relative z-20 uppercase"
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(0.55rem, 1vw, 0.9rem)",
            color:         "#03045e",
            letterSpacing: "0.3em",
            opacity:       0.8,
          }}
        >
          MATIC
        </span>
      </div>
    </div>
  );
}
