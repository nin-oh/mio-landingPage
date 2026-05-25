export default function FlashOverlay() {
  return (
    <div
      id="scene-flash-overlay"
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ opacity: 0 }}
    />
  );
}
