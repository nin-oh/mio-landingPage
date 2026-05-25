export type FlashType = "white" | "dark" | "teal";

export async function triggerFlash(type: FlashType = "white", duration = 0.35) {
  if (typeof window === "undefined") return;
  const { gsap } = await import("gsap");
  const overlay = document.getElementById("scene-flash-overlay");
  if (!overlay) return;
  const colors: Record<FlashType, string> = {
    white: "#ffffff",
    dark:  "#000000",
    teal:  "#00d9ff",
  };
  overlay.style.background = colors[type];
  gsap.fromTo(overlay, { opacity: 1 }, { opacity: 0, duration, ease: "power2.out" });
}
