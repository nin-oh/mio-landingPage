import { ReducedMotionProvider } from "@/lib/reduced-motion";
import FlashOverlay from "@/components/effects/FlashOverlay";
import Scene1Calm    from "@/components/scenes/Scene1Calm";
import Scene2Threat  from "@/components/scenes/Scene2Threat";
import Scene3Hero    from "@/components/scenes/Scene3Hero";
import Scene4Clash   from "@/components/scenes/Scene4Clash";
import Scene5Victory from "@/components/scenes/Scene5Victory";

export default function Home() {
  return (
    <ReducedMotionProvider>
      {/* Full-screen flash overlay — lives above everything, driven by GSAP */}
      <FlashOverlay />
      <main>
        <Scene1Calm    />
        <Scene2Threat  />
        <Scene3Hero    />
        <Scene4Clash   />
        <Scene5Victory />
      </main>
    </ReducedMotionProvider>
  );
}
