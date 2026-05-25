/**
 * Generates 12 placeholder frames for the scroll-rotate section.
 * Each frame is a 600×600 PNG showing a gradient that rotates through hues
 * to simulate a product spin. Run: node scripts/generate-frames.mjs
 */
import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT_DIR = join(process.cwd(), "public", "sequence");
mkdirSync(OUT_DIR, { recursive: true });

const FRAMES = 12;
const SIZE = 600;

for (let i = 0; i < FRAMES; i++) {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext("2d");

  const t = i / (FRAMES - 1); // 0 → 1

  // Background
  const bg = ctx.createRadialGradient(SIZE / 2, SIZE / 2, 0, SIZE / 2, SIZE / 2, SIZE / 2);
  bg.addColorStop(0, `hsl(${330 + t * 40}, 80%, 12%)`);
  bg.addColorStop(1, "#0d0008");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Bottle silhouette — capsule shape rotated slightly per frame
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const bW = 120;
  const bH = 260;
  const angle = (t - 0.5) * Math.PI * 0.25; // ±22.5°

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // Body gradient
  const bodyGrad = ctx.createLinearGradient(-bW / 2, -bH / 2, bW / 2, bH / 2);
  const hue = 330 + t * 30;
  bodyGrad.addColorStop(0, `hsl(${hue}, 100%, 90%)`);
  bodyGrad.addColorStop(0.3, `hsl(${hue}, 100%, 65%)`);
  bodyGrad.addColorStop(0.7, `hsl(${hue}, 90%, 40%)`);
  bodyGrad.addColorStop(1, `hsl(${hue + 10}, 80%, 15%)`);

  const r = bW / 2;
  ctx.beginPath();
  ctx.moveTo(-r, -bH / 2 + r);
  ctx.arcTo(-r, -bH / 2, 0, -bH / 2, r);
  ctx.arcTo(r, -bH / 2, r, 0, r);
  ctx.arcTo(r, bH / 2, 0, bH / 2, r);
  ctx.arcTo(-r, bH / 2, -r, 0, r);
  ctx.closePath();
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  // Highlight streak
  ctx.beginPath();
  ctx.ellipse(-bW * 0.22, -bH * 0.15, bW * 0.06, bH * 0.18, -0.2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fill();

  // Label band
  ctx.beginPath();
  ctx.rect(-r + 4, -30, bW - 8, 60);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fill();

  // Logo text
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "bold 32px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("MIO", 0, 0);

  ctx.restore();

  // Glow
  const glow = ctx.createRadialGradient(cx, cy, bW * 0.3, cx, cy, SIZE * 0.45);
  glow.addColorStop(0, `hsla(${hue}, 100%, 55%, 0.35)`);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SIZE, SIZE);

  const filename = `frame-${String(i + 1).padStart(4, "0")}.png`;
  writeFileSync(join(OUT_DIR, filename), canvas.toBuffer("image/png"));
  console.log(`✓ ${filename}`);
}

console.log(`\nAll ${FRAMES} frames written to public/sequence/`);
